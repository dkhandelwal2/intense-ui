import React from "react";
import { ComponentDocData } from "./types";
import { BARCODE_EXAMPLES } from "@/components/showcases/barcode/constants";

export { BARCODE_EXAMPLES };

export const BARCODE_USAGE = `"use client";

import { Barcode } from "@/components/ui/barcode";

export default function BarcodeDemo() {
  return (
    <div className="flex items-center justify-center p-8">
      <Barcode value="INTENSE-2026" format="code128" copyable downloadable />
    </div>
  );
}`;

export const barcodeDoc: ComponentDocData = {
  usageCode: BARCODE_USAGE,
  codeContent: BARCODE_USAGE,
  codes: BARCODE_EXAMPLES.reduce((acc, ex) => {
    acc[ex.id] = ex.code;
    return acc;
  }, {} as Record<string, string>),
  tocItems: BARCODE_EXAMPLES.map((ex) => ({
    id: ex.id,
    label: ex.label,
    icon: (
      <span role="img" aria-label={ex.label} className="inline-flex items-center justify-center select-none leading-none">
        {ex.emoji}
      </span>
    ),
  })),
  dependencies: [
    { name: "clsx", command: "npm install clsx" },
    { name: "tailwind-merge", command: "npm install tailwind-merge" },
  ],
  propGroups: [
    {
      title: "Barcode",
      description: "Root configuration props for 1D and 2D barcode rendering, layout archetypes, styling, and action triggers.",
      props: [
        { prop: "value", type: "string", defaultValue: "-", description: "The dynamic string, URL, serial, tracking number, or binary data to encode." },
        { prop: "format", type: '"code128" | "qr" | "data-matrix" | "code39" | "ean13"', defaultValue: '"code128"', description: "Barcode symbology standard (1D linear or 2D square matrix)." },
        { prop: "variant", type: '"classic" | "brand-card" | "location-card" | "boarding-pass" | "shipping-label" | "cyber-scan" | "retail-tag"', defaultValue: '"classic"', description: "Card presentation archetype and visual theme style." },
        { prop: "dotStyle", type: '"square" | "dots" | "rounded"', defaultValue: '"square"', description: "Geometric shape style for 2D matrix modules (QR Code & Data Matrix)." },
        { prop: "size", type: "number", defaultValue: "140", description: "Square dimension width and height in pixels for 2D matrix barcodes." },
        { prop: "height", type: "number", defaultValue: "80", description: "Vertical bar height in pixels for 1D linear barcodes." },
        { prop: "barWidth", type: "number", defaultValue: "2", description: "Module bar width multiplier in pixels for 1D barcodes." },
        { prop: "color", type: "string", defaultValue: '"currentColor"', description: "Fill color for barcode bars, matrix dots, and human-readable text." },
        { prop: "textColor", type: "string", defaultValue: "-", description: "Custom override color for alphanumeric text below barcode (defaults to barcode color or theme foreground)." },
        { prop: "accentColor", type: "string", defaultValue: '"#6366f1"', description: "Theme color for ambient glows, flight contrails, hazard stripes, and reticles." },
        { prop: "showText", type: "boolean", defaultValue: "true", description: "Whether to render human-readable alphanumeric text below the barcode." },
        { prop: "copyable", type: "boolean", defaultValue: "false", description: "Displays a click-to-copy button to copy the encoded text to clipboard." },
        { prop: "downloadable", type: "boolean", defaultValue: "false", description: "Displays a one-click button to download the barcode as a vector SVG file." },
        { prop: "centerIcon", type: "React.ReactNode", defaultValue: "-", description: "Custom brand icon or logo centered inside a 2D QR Code matrix." },
        { prop: "headerIcon", type: "React.ReactNode", defaultValue: "-", description: "Custom icon node displayed in the top card header badge." },
        { prop: "airplaneIcon", type: "React.ReactNode", defaultValue: "-", description: "Custom vector icon rendered on the flight contrail and route telemetry line." },
        { prop: "showShape", type: "boolean", defaultValue: "true", description: "Toggles geometric 3D vector shading and background silhouettes." },
        { prop: "shape", type: '"diamond" | "none"', defaultValue: '"diamond"', description: "Geometric background archetype for card variants." },
        { prop: "background", type: "string", defaultValue: '"transparent"', description: "Background canvas fill color behind the barcode." },
        { prop: "metadata", type: "BarcodeMetadata", defaultValue: "{}", description: "Contextual data object configuring flight, cargo, brand, GPS, or retail metadata." },
        { prop: "className", type: "string", defaultValue: "-", description: "Custom Tailwind CSS classes applied to root container element." },
      ],
    },
    {
      title: "BarcodeMetadata",
      description: "Contextual metadata object passed to metadata prop to power real-world cards (boarding passes, cargo waybills, brand cards, GPS tags).",
      props: [
        { prop: "departure", type: "string", defaultValue: '"11:12 AM"', description: "Departure time displayed in flight header HUD." },
        { prop: "departureLabel", type: "string", defaultValue: '"DEPARTURE"', description: "Custom prefix label for departure time." },
        { prop: "arrival", type: "string", defaultValue: '"4:34 PM"', description: "Arrival time displayed in flight header HUD." },
        { prop: "arrivalLabel", type: "string", defaultValue: '"ARRIVAL"', description: "Custom prefix label for arrival time." },
        { prop: "status", type: "string", defaultValue: '"ON TIME"', description: "Live flight or cargo clearance status text." },
        { prop: "statusLabel", type: "string", defaultValue: "-", description: "Custom override label for the status indicator badge." },
        { prop: "statusColor", type: "string", defaultValue: '"#10b981"', description: "Custom color for the pulsing status dot and badge text." },
        { prop: "from", type: "string", defaultValue: '"YYZ"', description: "Origin IATA airport or departure hub code (e.g. JFK, YYZ)." },
        { prop: "fromCity", type: "string", defaultValue: '"TORONTO"', description: "Full origin city and state/country name." },
        { prop: "to", type: "string", defaultValue: '"LAX"', description: "Destination IATA airport code or sorting terminal (e.g. LAX, ORD-04)." },
        { prop: "toCity", type: "string", defaultValue: '"LOS ANGELES"', description: "Full destination city or facility name." },
        { prop: "flight", type: "string", defaultValue: '"AC518"', description: "Flight number code displayed in boarding pass HUD pill." },
        { prop: "gate", type: "string", defaultValue: '"G12"', description: "Assigned departure gate identifier." },
        { prop: "seat", type: "string", defaultValue: '"04A"', description: "Assigned passenger seat number." },
        { prop: "group", type: "string", defaultValue: '"PRIORITY"', description: "Passenger boarding group tier printed on stub." },
        { prop: "groupLabel", type: "string", defaultValue: '"Group"', description: "Header label for boarding group column." },
        { prop: "carrier", type: "string", defaultValue: '"GLOBAL AIR CARGO"', description: "Cargo freight carrier or airline operator name." },
        { prop: "trackingId", type: "string", defaultValue: "-", description: "Shipment tracking number displayed above cargo barcode." },
        { prop: "trackingLabel", type: "string", defaultValue: '"CARGO TRACKING:"', description: "Header label displayed above tracking barcode." },
        { prop: "badge", type: "string", defaultValue: '"PRIORITY 1 // AIR"', description: "Highlighted priority pill badge in cargo label header." },
        { prop: "service", type: "string", defaultValue: '"NEXT-DAY AIR"', description: "Logistics shipping class or service tier." },
        { prop: "pieces", type: "string", defaultValue: '"1 OF 1"', description: "Shipment handling piece count sequence." },
        { prop: "weight", type: "string", defaultValue: '"2.45 KG"', description: "Gross payload weight displayed in cargo telemetry strip." },
        { prop: "securityLabel", type: "string", defaultValue: '"IATA SECURE CARGO"', description: "Security clearance tag displayed in shipping label footer." },
        { prop: "compliance", type: "string", defaultValue: '"CLASS 9 // AUTO-SORT PASS"', description: "Hazmat or auto-sort compliance clearance code." },
        { prop: "showSortMatrix", type: "boolean", defaultValue: "false", description: "Whether to render the 2D Data Matrix sorter code next to destination." },
        { prop: "title", type: "string", defaultValue: "-", description: "Primary heading for brand, location check-in, cyber, or retail tag." },
        { prop: "subtitle", type: "string", defaultValue: "-", description: "Secondary subtitle, description, or address line." },
        { prop: "coordinates", type: "string", defaultValue: "-", description: "Latitude and longitude GPS coordinate string for location cards." },
        { prop: "price", type: "string", defaultValue: '"$185.00"', description: "Suggested retail price tag string for boutique hangtags." },
        { prop: "frequency", type: "string", defaultValue: '"915.00 MHz"', description: "Radio frequency telemetry readout displayed on cyber scanner HUD." },
        { prop: "opticalLock", type: "string", defaultValue: '"TRUE"', description: "Optical lock state indicator string on cyber scanner HUD." },
        { prop: "scanningLabel", type: "string", defaultValue: '"SCANNING"', description: "Label text for the active scanning state button in cyber HUD." },
        { prop: "standbyLabel", type: "string", defaultValue: '"STANDBY"', description: "Label text for the standby state button in cyber HUD." },
        { prop: "logo", type: "React.ReactNode", defaultValue: "-", description: "Custom logo node rendered in brand card or boarding pass HUD." },
        { prop: "icon", type: "React.ReactNode", defaultValue: "-", description: "Custom icon node rendered in card header badges." },
        { prop: "airplaneIcon", type: "React.ReactNode", defaultValue: "-", description: "Custom vector icon node overriding the route and contrail airplane." },
        { prop: "routeIcon", type: "React.ReactNode", defaultValue: "-", description: "Custom route transit vector icon between origin and destination." },
      ],
    },
  ],
};
