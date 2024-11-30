import PortfoliotRepository from "../../repositories/karnalwebtech/portfolio-repositories";
import CategorieRepository from "../../repositories/karnalwebtech/post-categorie-repositories";
import PostRepository from "../../repositories/karnalwebtech/post-repositories";
import TagRepository from "../../repositories/karnalwebtech/tag-repositories";
import PortfoliotService from "../../services/karnalwebtech/portfolio-service";
import CategorieService from "../../services/karnalwebtech/post-caregorie-service";
import PostService from "../../services/karnalwebtech/post-service";
import TagService from "../../services/karnalwebtech/tag-service";

const servicesLoader = (repositories: {
  categorieRepository: CategorieRepository;
  tagRepository: TagRepository;
  postRepository: PostRepository;
  portfoliotRepository: PortfoliotRepository;
}) => {
  const categorieService = new CategorieService(
    repositories.categorieRepository
  );
  const tagService = new TagService(repositories.tagRepository);
  const postService = new PostService(repositories.postRepository);
  const portfoliotService = new PortfoliotService(
    repositories.portfoliotRepository
  );

  return {
    categorieService,
    tagService,
    postService,
    portfoliotService,
  };
};

export default servicesLoader;
