import UpdatePostCategorie from "@/modules/karnalwebtech/post/categorie/update-categorie";
import UpdatePost from "@/modules/karnalwebtech/post/update-post/update-post";
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
    return <UpdatePost id={edit} />
};

export default page;
