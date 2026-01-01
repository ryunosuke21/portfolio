"use client";

import React from "react";
import isoCountries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import {
  AsYouType,
  type CountryCode,
  getCountries,
  getCountryCallingCode,
} from "libphonenumber-js";
import { Check, Phone } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@portfolio/ui/components/command";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@portfolio/ui/components/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@portfolio/ui/components/popover";
import { ScrollArea } from "@portfolio/ui/components/scroll-area";
import { cn } from "@portfolio/ui/lib/utils";

// Register locale once at module level
isoCountries.registerLocale(enLocale);

function getCountryName(countryCode: CountryCode): string {
  return isoCountries.getName(countryCode, "en") || countryCode;
}
type PhoneInputProps = Omit<React.ComponentProps<"input">, "type"> & {
  defaultCountry?: CountryCode;
  showCountry?: boolean;
};

export function PhoneInput({
  className,
  defaultCountry,
  showCountry = true,
  ...props
}: PhoneInputProps) {
  const [value, setValue] = React.useState("");
  const [selectedCountry, setSelectedCountry] = React.useState<
    CountryCode | undefined
  >(defaultCountry);

  const formatter = React.useMemo(
    () => new AsYouType(selectedCountry),
    [selectedCountry],
  );

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    formatter.reset();
    const val = event.target.value as string;
    if (
      event.nativeEvent instanceof InputEvent &&
      event.nativeEvent.inputType === "deleteContentBackward"
    ) {
      setValue(val);
      return;
    }

    const formattedValue = formatter.input(val);
    let nextValue = formattedValue;
    const matchCountry = formatter.getCountry();
    const displayCountry = matchCountry ?? selectedCountry;
    if (matchCountry && matchCountry !== selectedCountry) {
      setSelectedCountry(matchCountry);
    }
    if (displayCountry) {
      const callingCode = getCountryCallingCode(displayCountry);
      if (formattedValue.startsWith(`+${callingCode}`)) {
        nextValue = formattedValue.replace(
          new RegExp(`^\\+${callingCode}\\s*`),
          "",
        );
      }
    }
    setValue(nextValue);
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    props?.onBlur?.(event);
  }

  return (
    <InputGroup className={cn(className)}>
      <InputGroupInput
        {...props}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {showCountry && (
        <InputGroupAddon>
          <PhoneInputCountrySelect
            className="rounded-r-none border-r"
            value={selectedCountry}
            onValueChange={(next) => {
              if (next) {
                setSelectedCountry(next);
              }
            }}
          />
        </InputGroupAddon>
      )}
    </InputGroup>
  );
}

type PhoneInputCountrySelectProps = React.ComponentProps<typeof Popover> & {
  className?: string;
  countries?: CountryCode[];
  defaultCountry?: CountryCode;
  value?: CountryCode;
  onValueChange?: (value: CountryCode | undefined) => void;
};

export function PhoneInputCountrySelect({
  className,
  countries = getCountries(),
  defaultCountry,
  value,
  onValueChange,
  ...props
}: PhoneInputCountrySelectProps) {
  const [selectedCountry, setSelectedCountry] = React.useState<
    CountryCode | undefined
  >(value);

  React.useEffect(() => {
    setSelectedCountry(value);
  }, [value]);

  function handleValueChange(value: CountryCode) {
    if (value === selectedCountry) {
      setSelectedCountry(undefined);
      onValueChange?.(undefined);
      return;
    }

    setSelectedCountry(value);
    onValueChange?.(value);
  }

  return (
    <Popover {...props}>
      <PopoverTrigger asChild>
        <InputGroupButton className={cn(className)}>
          {selectedCountry !== undefined ? (
            <span>+ {getCountryCallingCode(selectedCountry)}</span>
          ) : (
            <>
              <Phone />
              <span>+ 00</span>
            </>
          )}
        </InputGroupButton>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search country..." />
          <CommandList>
            <ScrollArea viewportClassName="max-h-[200px]">
              <CommandEmpty>No country found</CommandEmpty>
              <CommandGroup>
                {countries.map((country) => {
                  const countryName = getCountryName(country);
                  const callingCode = getCountryCallingCode(country);
                  // Include country code, name, and calling code in searchable value
                  const searchValue = `${country} ${countryName} +${callingCode}`;
                  return (
                    <CommandItem
                      key={country}
                      value={searchValue}
                      onSelect={() => handleValueChange(country)}
                      className="gap-2"
                    >
                      {selectedCountry === country && <Check />}
                      <span className="text-foreground">{country}</span>
                      <span className="text-muted-foreground">
                        + {callingCode}
                      </span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
