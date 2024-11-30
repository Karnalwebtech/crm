
import UpdatePortfolio from "@/modules/karnalwebtech/portfolio/update-post/update-post";
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
    return <UpdatePortfolio id={edit} />
};

export default page;
