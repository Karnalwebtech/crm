import UpdatePostCategorie from "@/modules/karnalwebtech/post/categorie/update-categorie";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Update newCategorie",
};

interface SlugPageProps {
    params: {
        edit: string;
    };
}
const page: React.FC<SlugPageProps> = ({ params }) => {
    const { edit } = params
    return <UpdatePostCategorie id={edit} />
};

export default page;
