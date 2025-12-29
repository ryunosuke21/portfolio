"use client";

import type React from "react";
import { Mail, MapPin, Phone } from "lucide-react";

import { Button } from "@portfolio/ui/components/button";
import { Input } from "@portfolio/ui/components/input";
import { Textarea } from "@portfolio/ui/components/textarea";

export function ContactSection() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section id="contact" className="bg-muted/30 py-24">
      <div className="container mx-auto px-6">
        <h2 className="mb-12 text-center font-bold text-4xl md:text-5xl">
          Get In Touch
        </h2>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h3 className="mb-6 font-semibold text-2xl">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span>mario.pon@example.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <span>+504 1234-5678</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span>San Pedro Sula, Honduras</span>
              </div>
            </div>
            <p className="mt-8 text-muted-foreground">
              {"I'm"} always interested in hearing about new projects and
              opportunities. Feel free to reach out if you
              {"'d"} like to connect!
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Input placeholder="Your Name" required />
            </div>
            <div>
              <Input type="email" placeholder="Your Email" required />
            </div>
            <div>
              <Input placeholder="Subject" required />
            </div>
            <div>
              <Textarea
                placeholder="Your Message"
                rows={5}
                required
                className="resize-none"
              />
            </div>
            <Button type="submit" size="lg" className="w-full">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
