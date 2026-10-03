const fs = require('fs');

const payload = {
  about_why_trust_us: [
    {
      "id": 1,
      "lang": "am",
      "title": "Ինչո՞ւ են մեզ վստահում",
      "stats": [
        { "value": "18+", "label": "տարվա փորձ բնական մրգային արտադրանքի ոլորտում:" },
        { "value": "5500 քմ", "label": "ժամանակակից արտադրական համալիր:" },
        { "value": "150–250 տ", "label": "տարեկան արտադրական հզորություն:" },
        { "value": "", "label": "Արհեստավարժ աշխատակիցներ, որոնք ամեն օր ապահովում են արտադրության անընդհատ աշխատանքը:" },
        { "value": "150+", "label": "տեսակի արտադրանք տարբեր համերով և փաթեթավորումներով:" },
        { "value": "6+", "label": "արտահանման երկիր ամբողջ աշխարհում:" },
        { "value": "25+", "label": "միջազգային և տեղական գործընկեր:" },
        { "value": "ISO 22000, HACCP", "label": "որակի և սննդի անվտանգության միջազգային հավաստագրեր:" },
        { "value": "", "label": "Ժամանակակից արտադրական տեխնոլոգիաներ և որակի վերահսկողության բազմաստիճան համակարգ:" }
      ]
    },
    {
      "id": 2,
      "lang": "ru",
      "title": "Почему нам доверяют",
      "stats": [
        { "value": "18+", "label": "лет опыта в производстве натуральной фруктовой продукции." },
        { "value": "5500 кв.м", "label": "современный производственный комплекс." },
        { "value": "150–250 т", "label": "годовая производственная мощность." },
        { "value": "", "label": "Профессиональные сотрудники, ежедневно обеспечивающие бесперебойную работу производства." },
        { "value": "150+", "label": "видов продукции с различными вкусами и упаковкой." },
        { "value": "6+", "label": "стран-импортеров по всему миру." },
        { "value": "25+", "label": "международных и местных партнеров." },
        { "value": "ISO 22000, HACCP", "label": "международные сертификаты качества и безопасности пищевых продуктов." },
        { "value": "", "label": "Современные производственные технологии и многоступенчатая система контроля качества." }
      ]
    },
    {
      "id": 3,
      "lang": "en",
      "title": "Why trust us",
      "stats": [
        { "value": "18+", "label": "years of experience in natural fruit production." },
        { "value": "5500 sq.m", "label": "modern production complex." },
        { "value": "150–250 t", "label": "annual production capacity." },
        { "value": "", "label": "Professional staff ensuring continuous production." },
        { "value": "150+", "label": "types of products with different flavors and packaging." },
        { "value": "6+", "label": "export countries worldwide." },
        { "value": "25+", "label": "international and local partners." },
        { "value": "ISO 22000, HACCP", "label": "international certificates for quality and food safety." },
        { "value": "", "label": "Modern production technologies and multi-stage quality control system." }
      ]
    }
  ],
  about_quality_naturalness: [
    {
      "id": 1,
      "lang": "am",
      "card1": {
        "eyebrow": "ՈՐԱԿ ԵՎ ԲՆԱԿԱՆՈՒԹՅՈՒՆ",
        "title": "Մեր բոլոր արտադրանքները 100% բնական են",
        "paragraphs": [
          "Մենք չենք օգտագործում հավելյալ շաքար, արհեստական ներկանյութեր կամ կոնսերվանտներ: Արտադրանքը հասանելի է տարբեր փաթեթավորումներով, իսկ պահպանման ժամկետը կազմում է 12-14 ամիս՝ կախված արտադրանքի տեսակից:",
          "Տարիների ընթացքում Fruit Food-ի արտադրանքը բազմիցս արժանացել է մրցանակների, պատվոգրերի և սպառողների բարձր գնահատականին՝ հաստատելով մեր արտադրանքի որակն ու վստահելիությունը:"
        ]
      },
      "card2": {
        "eyebrow": "ՆՈՐԱՐԱՐՈՒԹՅՈՒՆ",
        "title": "Նոր տեխնոլոգիաներ, նոր լուծումներ",
        "paragraph": "Մենք մշտապես ներդրումներ ենք կատարում նոր տեխնոլոգիաների, արտադրանքի զարգացման և միջազգային շուկաների պահանջներին համապատասխան լուծումների ստեղծման ուղղությամբ:"
      }
    },
    {
      "id": 2,
      "lang": "ru",
      "card1": {
        "eyebrow": "КАЧЕСТВО И НАТУРАЛЬНОСТЬ",
        "title": "Вся наша продукция 100% натуральная",
        "paragraphs": [
          "Мы не используем добавленный сахар, искусственные красители и консерванты. Продукция доступна в различных упаковках, а срок годности составляет 12-14 месяцев в зависимости от вида продукции.",
          "За годы работы продукция Fruit Food неоднократно удостаивалась наград, дипломов и высокой оценки потребителей, подтверждая качество и надежность нашей продукции."
        ]
      },
      "card2": {
        "eyebrow": "ИННОВАЦИИ",
        "title": "Новые технологии, новые решения",
        "paragraph": "Мы постоянно инвестируем в новые технологии, развитие продукции и создание решений, соответствующих требованиям международных рынков."
      }
    },
    {
      "id": 3,
      "lang": "en",
      "card1": {
        "eyebrow": "QUALITY AND NATURALNESS",
        "title": "All our products are 100% natural",
        "paragraphs": [
          "We do not use added sugar, artificial colors, or preservatives. The product is available in various packaging, and the shelf life is 12-14 months depending on the type of product.",
          "Over the years, Fruit Food products have repeatedly received awards, diplomas, and high consumer appreciation, confirming the quality and reliability of our production."
        ]
      },
      "card2": {
        "eyebrow": "INNOVATION",
        "title": "New technologies, new solutions",
        "paragraph": "We constantly invest in new technologies, product development, and creating solutions that meet the requirements of international markets."
      }
    }
  ]
};

// 1. Update hamlet.json
let hamlet = JSON.parse(fs.readFileSync('db_parts/hamlet.json', 'utf8'));
hamlet = { ...hamlet, ...payload };
fs.writeFileSync('db_parts/hamlet.json', JSON.stringify(hamlet, null, 2));

// 2. Update db.json
let db = JSON.parse(fs.readFileSync('db.json', 'utf8'));
db = { ...db, ...payload };
fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
