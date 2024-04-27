
import { ManageDonnees } from '../Services/manageDonnees.service.ts'
import { Article } from "../Entitees/Entites/Article.ts"; 

export class ArticleController {

  public _article?: Article;

  constructor(...args: any) {
    let nbargs: Number = args.lenght;
    switch (nbargs) { 
      case 0: () => { }; break;
      case 1: (article: Article) => { this._article = article; }
    }

  }
  /**
   * Function deletArticle
   * @param typePersistance :string  
   * @param id : Number
   * @returns Boolean
   */
  public deleteArticle(typePersistance: string, id: Number): Boolean {
    let manageDonnees = new ManageDonnees();
    manageDonnees.instantiateProperties('articles');
    return manageDonnees.delete(id);
  }



  public processArticle() { }

  /**
   * Function persist
   * @param typePersistance :string
   * @returns Boolean
   */
  public async persist(typePersistance: string) {

    let manageDonnees = new ManageDonnees('articles');
    console.log("articleController L35", this.article);
    let ret = await manageDonnees.persist(this.article, typePersistance)
      .then(() => { return true; })
      .catch((err: any) => { console.error("Route : /article/submit-form - Request failed to post requestValue !"); return false; })
    return ret;
  }

  public async update(typePersistance: string) {
    return this.persist(typePersistance);

  }


  public fetchArticleDB() { }

  /**
   * Function fetchLastId
   * @param typePersistance :string
   * @returns Number
   */
  public fetchLastId(typePersistance: string): Number {
    let manageDonnees = new ManageDonnees('articles');
    let ret = manageDonnees.getLastId(typePersistance);
    return ret;
  }

  /**
   * Function setRequestArticle
   * @param requestValue :any
   * @returns article:Article
   */
  public setRequestArticle(requestValue: any) {
    console.log('articleController 76 : ', requestValue);
    let article = new Article(requestValue._id, requestValue._title, requestValue._description, requestValue._url, requestValue._availableUnits, requestValue._quantity,
      requestValue._year, requestValue._price);  
    this._article = article;

    console.log('articleController 61 : ', this._article);
    return article;
  }



  public get article(): Article | null | undefined { return this._article; }
  public set article(article: Article) {
    this._article = article;
 
  } 







}