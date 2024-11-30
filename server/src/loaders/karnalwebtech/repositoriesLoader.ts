import PortfoliotRepository from "../../repositories/karnalwebtech/portfolio-repositories";
import CategorieRepository from "../../repositories/karnalwebtech/post-categorie-repositories";
import PostRepository from "../../repositories/karnalwebtech/post-repositories";
import TagRepository from "../../repositories/karnalwebtech/tag-repositories";

const repositoriesLoader = () => {
  const categorieRepository = new CategorieRepository();
  const tagRepository = new TagRepository();
  const postRepository = new PostRepository();
  const portfoliotRepository = new PortfoliotRepository();
  return {
    categorieRepository,
    tagRepository,
    postRepository,
    portfoliotRepository,
  };
};
export default repositoriesLoader;
