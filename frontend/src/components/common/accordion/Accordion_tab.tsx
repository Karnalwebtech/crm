"use client"
import { Accordion, AccordionItem } from "@nextui-org/react";
import Textarea_normal from "../fields/Textarea_normal";
import { useCallback, useState } from "react";

interface AccordionItemData {
  key: string;
  label: string;
}

interface AccordionItemProps {
  data: AccordionItemData[];
  value: any[]; // Change this to the appropriate type
  set_value: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function Accordion_tab({ data, value, set_value }: AccordionItemProps) {

  const handleInputChange = useCallback((value: string, i: number, key: string) => {
    set_value(prev => {
      const new_data = [...prev];
      new_data[i] = {
        ...new_data[i],
        [key]: value,
      };
      return new_data;
    });
  }, [set_value]);


  return (
    <Accordion variant="splitted">
      {data.map((item, i) => (
        <AccordionItem key={item.key} aria-label={`Accordion ${i}`} title={item.label}>
          <Textarea_normal
            label={item.key}
            value={value?.[i]?.[item.key] || ''} // Use the appropriate value from notes_terms
            get_value={(value) => handleInputChange(value, i, item.key)}
          />
        </AccordionItem>
      ))}
    </Accordion>
  );
}
