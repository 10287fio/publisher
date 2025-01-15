const NavEnum: { key: string, value: string, url: string, lang: string }[] = [
    {key: 'zin', value: 'ZIN : THE SMALLEST UNIT', url: '/zin', lang: 'en'}
    , {key: 'donate', value: 'Donate', url: '/donate', lang: 'en'}
    , {key: 'book', value: 'Book', url: '/book', lang: 'en'}
    , {key: 'kor_zin', value: '진 : 가장 최소의 단위', url: '/kor/zin', lang: 'kor'}
    , {key: 'kor_donate', value: '후원', url: '/kor/donate', lang: 'kor'}
    , {key: 'kor_book', value: '책', url: '/kor/book', lang: 'kor'}
    , {key: 'jp_zin', value: '真：最も最小の単位', url: '/jp/zin', lang: 'jp'}
    , {key: 'jp_donate', value: '後援', url: '/jp/donate', lang: 'jp'}
    , {key: 'jp_book', value: '本', url: '/jp/book', lang: 'jp'}
] as const;

export default NavEnum;