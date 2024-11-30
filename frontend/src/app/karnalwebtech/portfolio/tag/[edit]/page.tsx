import UpdatePostTag from "@/modules/karnalwebtech/portfolio/tag/update-tag";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Update new Tag",
};

interface SlugPageProps {
    params: {
        edit: string;
    };
}
const page: React.FC<SlugPageProps> = ({ params }) => {
    const { edit } = params
    return <UpdatePostTag id={edit} />
};

export default page;
