"use client";

import React from "react";
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

type Country = ConstructorParameters<typeof AsYouType>[0]; // e.g. "US", "GB"
type PhoneInputProps = Omit<React.ComponentProps<"input">, "type"> & {
  defaultCountry?: CountryCode;
};

export function PhoneInput({ className, ...props }: PhoneInputProps) {
  const [value, setValue] = React.useState("");
  const country: CountryCode = "US";

  const formatter = React.useMemo(() => new AsYouType(country), []);

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
    if (val.startsWith("+")) {
      const matchCountry = formatter.getCountry();
      if (matchCountry) {
        // TODO Update the selected country
      }
    }
    setValue(formattedValue);
  }

  return (
    <InputGroup className={cn(className)}>
      <InputGroupInput {...props} value={value} onChange={handleChange} />
      <InputGroupAddon>
        <PhoneInputCountrySelect />
      </InputGroupAddon>
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
        <InputGroupButton>
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
                {countries.map((country) => (
                  <CommandItem
                    key={country}
                    value={country}
                    onSelect={() => handleValueChange(country)}
                    className="gap-2"
                  >
                    {selectedCountry === country && <Check />}
                    <span className="text-foreground">{country}</span>
                    <span className="text-muted-foreground">
                      + {getCountryCallingCode(country)}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
