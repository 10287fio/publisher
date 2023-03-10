const NavItemsLang: { value:string, key:string, url:string, lang:string }[] = [
  {value: "Enterprise", key: "enterprise", url: "/enterprise", lang: "default"}
  , {value: "ZIN : THE SMALLEST UNIT", key: "zin", url: "/zin", lang: "default"}
  , {value: "Essay", key: "essay", url: "/essay", lang: "default"}
  , {value: "Feedback", key: "feedback", url: "/feedback", lang: "default"}
  , {value: "Support", key: "support", url: "/support", lang: "default"}
  , {value: "회사", key: "kor_enterprise", url: "/kor/enterprise", lang: "kor"}
  , {value: "진 : 가장 최소의 단위", key: "kor_zin", url: "/kor/zin", lang: "kor"}
  , {value: "수필", key: "kor_essay", url: "/kor/essay", lang: "kor"}
  , {value: "문의", key: "kor_feedback", url: "/kor/feedback", lang: "kor"}
  , {value: "후원", key: "kor_support", url: "/kor/support", lang: "kor"}
  , {value: "会社", key: "jp_enterprise", url: "/jp/enterprise", lang: "jp"}
  , {value: "真：最も最小の単位", key: "jp_zin", url: "/jp/zin", lang: "jp"}
  , {value: "エッセー", key: "jp_essay", url: "/jp/essay", lang: "jp"}
  , {value: "問合せ", key: "jp_feedback", url: "/jp/feedback", lang: "jp"}
  , {value: "後援", key: "jp_support", url: "/jp/support", lang: "jp"}
]

const NavItemsUrl:{ key:string, url:string }[] = [
  { key: "enterprise", url: "/enterprise"}
  , { key: "zin", url: "/zin"}
  , { key: "essay", url: "/essay"}
  , { key: "feedback", url: "/feedback"}
  , { key: "support", url: "/support"}
]

export default {
  NavItemsLang,
  NavItemsUrl
}