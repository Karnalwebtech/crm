import * as React from "react";
import { Image, Card, Button, CardBody } from "@nextui-org/react";
import { DeleteIcon, Trash2 } from "lucide-react";

interface ImageCardProps {
  item: any;
  index: number;
  onDelete: (index: number) => void; // Pass a delete handler function
}

export default function ImageCard({ item, index, onDelete }: ImageCardProps) {
  return (
    <Card key={item.img} className="relative">
      <CardBody className="relative group">
        {/* Image */}
        <Image
          src={item.img}
          isZoomed={true}
          alt={item.name}
          isBlurred={true}
          width={200}
          height={200}
          className="block"
        />
        {/* Delete Button */}
        <div className="absolute z-10 inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button isIconOnly onClick={() => onDelete(index)}>
            <Trash2 color="red" size={20} />
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
