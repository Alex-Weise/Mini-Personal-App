export type TContent = {
      brand: string,
      images: string[],
      description: string,
      id: number,
      category: string,

};
export type TPersonalCard = {
    catalog: TContent[],
    content: TContent[],
    error: boolean,
    loading: boolean,
    serchErr: string,
};
export type TCard = {
    title: string,
    img: string,
    discr: string,
  }
export type TButton = {
    name: string,
    onClick: Function,
};
export type TCatergory = {
    categories: string[],
    onClick: Function,
};
export type THeader = {
    onClick: Function,
}
