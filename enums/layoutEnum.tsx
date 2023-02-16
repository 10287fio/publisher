const NavItems = {
  enterprise : 0,
  zin : 1,
  essay : 2,
  feedback : 3,
  support : 4
} as const
type NavItems = typeof NavItems[keyof typeof NavItems]

const NavItemsLang: { value:string, key:string, lang:string }[] = [
  {value: "Enterprise", key: "enterprise", lang: "default"}
  , {value: "ZIN : THE SMALLEST UNIT", key: "zin", lang: "default"}
  , {value: "Essay", key: "essay", lang: "default"}
  , {value: "Feedback", key: "feedback", lang: "default"}
  , {value: "Support", key: "support", lang: "default"}
  , {value: "회사", key: "enterprise", lang: "kor"}
  , {value: "진 : 가장 최소의 단위", key: "zin", lang: "kor"}
  , {value: "수필", key: "essay", lang: "kor"}
  , {value: "문의", key: "feedback", lang: "kor"}
  , {value: "후원", key: "support", lang: "kor"}
  , {value: "会社", key: "enterprise", lang: "jp"}
  , {value: "真：最も最小の単位", key: "zin", lang: "jp"}
  , {value: "エッセー", key: "essay", lang: "jp"}
  , {value: "問合せ", key: "feedback", lang: "jp"}
  , {value: "後援", key: "support", lang: "jp"}
]

const NavItemsUrl:{ key:string, url:string }[] = [
  { key: "enterprise", url: "/enterprise"}
  , { key: "zin", url: "/zin"}
  , { key: "essay", url: "/essay"}
  , { key: "feedback", url: "/feedback"}
  , { key: "support", url: "/support"}
]

export default {
  NavItems,
  NavItemsLang,
  NavItemsUrl
}