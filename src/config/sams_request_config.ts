import {SAMS_HOME_URL} from '../constants/urls';

export const SAMS_SERVICE_CONFIG = {
  baseURL: SAMS_HOME_URL,
  params: {
    centralPts:
      '0000005854,0000006258,0000006215,0000006469,0000004913,0000006513,0000008118,0000006240,0000006297,0000004977,0000006294,0000006206,0000006246,0000006397,0000006233,0000008124,0000004973,0000006211,0000006396,0000006586,0000008121,0000006241,0000004746,0000008240,0000006286,0000006578,0000006310',
    storeId: '0000004944',
    _: 1708449984498,
  },
  headers: {
    authority: 'www.sams.com.mx',
    accept: 'application/json, text/javascript, */*; q=0.01',
    'accept-language': 'en-US,en;q=0.9,es-MX;q=0.8,es;q=0.7',
    cookie:
      '_pxvid=a9192745-8516-11ee-b751-21627e33d08a; _tt_enable_cookie=1; _ttp=IPGGWi_QV3whnX7Ejx5MvcUMxPi; FPID=FPID2.3.b1uklyMnA1vvd%2BI%2BTgAI4qFRY5w%2FqBhtXVFAqVeh3yQ%3D.1700204288; _cs_c=0; com.silverpop.iMAWebCookie=9822600a-a114-e473-69c5-e48ec4c3523e; mdLogger=false; kampyle_userid=6731-b064-ca8a-9f1a-97bd-3ed5-25b1-a184; attr_source_cookie=www.google.com; _ga_YZ2DWW9405=deleted; mtz_visitor_id=a9f427b0851611ee8a71f1604ae9819e; BVBRANDID=84c13257-e4d9-4af6-aeb8-805ca43aed34; _gcl_au=1.1.1972520900.1708021160; _evga_6b47=e99884ce54cc0be8.02Q; cto_bundle=697W6l9mb3RRNExpMTJ6V1JXZElBc3olMkZGOVg3aVpBcFFiUEpiOE1yOTAya2hlR3dlbERWeDRzUFdDY3owM1A1amppM0UxYzRsJTJGZ3lxS054aXk3JTJCVVIyVzY2anlKd2JEc0VLb0s5V0xTc21FUzhlZUx4VDdrZ016eDYwVmZ3MXExNnhKZ01rUGxiYURYTiUyRmVMOWZvbDBWSW1GZnZmdTc2WnglMkJjemFxQUtrTmRCMjJJSkUlMkZjJTJGWW1GQjI1dGFrNFdNSzQ5bVJiTHczM1NWOGtiNjdCUkFQRXJjaXclM0QlM0Q; CLOUD=prod-az-westus-3; JSESSIONID=XMz05c6zqNDlMqDsjy5bORjL.restapp-267254196-6-1339917675; _abck=9CD2A59587CE2E90C37F565DDF06FC72~0~YAAQBlLIFyZezMWNAQAANuqNxwuDxYHwqI8AJ1bK6UrqjIW3G9CQfAqZ5kwMXGOIDKtj8rwww2tQBIFMPS6SyjyFAmgD0+lKMZIv0o180TJd4gmQ4PyJTTXRsFcO+9vSZx7dZLMFYfgMbCBR7iCxoE1KbF1qxBMAcOvnucrnE/lwdozrzoTHGD6man3bxRJcmMyiW7TrwSNA2ZSa5ohrCzOp2cCadiy+GRK7P80Td71tZHY8mKOIsQzZHtIOLPYamQzE6pU7zcnL+se1e+whzWBzQ3fL0/o5laTpkHoUQQicrRHhDrt9WVuBNfarPU6AwEj5GztD5w0W5TJbbBARqvPwKukQmOL3HUrMcOjB9J0orMRez3aApiwTbIT127VpaQJ/bLKrTLMSLyGZWopFbrNIEsprkmxABw==~-1~-1~-1; ak_bmsc=313D129B77F4DE81E74C612E35492D9F~000000000000000000000000000000~YAAQBlLIFydezMWNAQAANuqNxxb9fU74Ad19Nrb92uf54mj1hV2b0QfybAIkvS1yFB6JScMPE5saWijmCbiWd01cPebq1xqSizAAfJACOc7Jimk7fVC0xP5+EqmpXCiBh16ZfN9+SgxXkAh/W4u/6AcQ2A7E/u5UT9PF4ZkRP/Ks3avPxZhxNOWgDS5TOd9IIqScnMVohFVS6oi67o3FqtYfjQ4Z12glDl0W8YakADFhVza2at0kgxg9NwzaXW1bTep8idluSz3DsE+IL7ha8feoiZQrm9CUOYYsDjTQs2tHL4lStKlKd1NA4xDEbvzwFr8QzADy5vB7hY+OrflHot+AYF4ZsCHV7HoQeB1UPS7E3+ddJ9frKqzzm/OErLnU8bk68TYJdE5+Q28=; bm_sz=3B97E7BBA520EC5708BCEC4E9F8C093F~YAAQBlLIFyhezMWNAQAANuqNxxboKSBdh0EvRxBieO1sp+MGhVg0tl4B9Ha25d7ZrFMs7ig/URs9izLP9win0ACn/xcJ3tZrXFiIdycDAiARMRvZsgG/I4S6i2v0G31pkaxrGlSUR98nY2iuWKHL9HCdJtnkifZfXLBioc4SHj6Up9R3nuoPQnEa9ZAegtDaY1U80y+cQsGcboBcvp8DLqn1/TBqRdV2Q7fFRnHYsipytCzBX+m/g1Ui7g8SIejYO4KOKYGV5L8yhDPI9rF+Jslf3wunwWdr5wp18UV4WHR9wQq1cC6t+DKNOo6NRSKpoWYzJfruLizAbqjSkDjKBY+Am3kg4KNX2DjTwRo7lU00CYTHO8tzyQ==~4536630~3290690; TS0e68bea5027=08cb8c7367ab200042d1736429d853167041bc23c807d6cf61e0fa59b37fefccf53ba43704283e80088b9656ba1130007bef6c8567706b1ea821e8c2cc1ff41df6c37a165872a044662b42b707ab6783409ab012a1844d1b769682b7f68965ba; TS01f4281b=0130aff232c8a6f4c82d81024e65660605a9e6f3f2f6fd2b24eb46c04d606dd0e8c5ab54c64b9ba0c3ba8a99b3ff2e88f5df44803b; TS01e4bdf1=0130aff232c8a6f4c82d81024e65660605a9e6f3f2f6fd2b24eb46c04d606dd0e8c5ab54c64b9ba0c3ba8a99b3ff2e88f5df44803b; storeId=0000004944; pxcts=2c155dd3-d015-11ee-ae92-cfa8d5d88a4a; CL=prod-cdc7; TS96155b32027=0800b316f6ab20009050f6533c2eeb67d0188cacbd5662e3f976418d85334225d5f7b751a82e0465080d3d382f11300028827aba778129782851c61aabad45870544b54fd756a8c24c6460dec4bc97bf9daf58eb6c7ff2a63cac14f415a6694e; _gid=GA1.3.54469546.1708449986; _gat_UA-10186874-1=1; com.ibm.commerce.ubx.idsync.google_gid%2CiMAWebCookie=com.ibm.commerce.ubx.idsync.google_gid%2CiMAWebCookie; _px3=0006c1aabb943b7c50f348c705fdd1964eaa35cf4dff5aec85e151b9b6309917:IyeLv0DkvRkd1btepeG3BxmsjAhPQc/XeFNhjicgfSfK+lxo7P9DI0JX9Pv9iV4MSjoVvW8GcHP+nOKJVQwY5w==:1000:P1/u972QwAJdf+fI0ZmGiS5J8Lv5qpIFPfbNTbanGYSlAc6BP4RFDQFQ8rtaIstymH2hzOrDFG3GyijSONyDrAJVa6e/12ij6FxV303QLjYxjX79F56aOXoDZalbksVXv2DXlPxxZG2fWdL08FP+5zgk72FtCC0SWNtOT39QSVndoQ5ThCLOeJMKh5Ubh0nqJShuZ19Q1012XIEwHyPkPM9utFTECDAv2fN5/HZ6P3s=; _dc_gtm_UA-10186874-1=1; _uetsid=2d1a1e70d01511eeb9dc0517fe1b6711; _uetvid=a9f427b0851611ee8a71f1604ae9819e; _pxde=32fd56cd877d0265bb48d40a023491b2bf322cde533a91f0b6cf87a3b6331ddd:eyJ0aW1lc3RhbXAiOjE3MDg0NDk5ODcxODl9; com.silverpop.iMA.session=49e658a8-db86-be95-cd71-12bc6ab8b58e; kampyleUserSession=1708449987988; kampyleUserSessionsCount=10; kampyleSessionPageCounter=1; FPLC=ADY2CfUXO5pYFpr3BfYr2tSU7Nx9XWqEYgmh30pPJEc8Ale469mLP34prByTRKXyUmY3aDXTgAtO%2FYZ4HHp6B%2FfmzzVNKIX6xrA16bf95JfJI4pzRd8IxXheZrO6nQ%3D%3D; _ga=GA1.3.737918111.1700204288; _cs_id=5fe1e08c-d902-a3b9-ae8f-3709ede62b19.1700204289.8.1708450001.1708449986.1499694866.1734368289614.0; _cs_s=2.0.1.1708451801595; com.silverpop.iMA.page_visit=-880065445:47:; _ga_KC4HTGN8HY=GS1.1.1708449986.9.1.1708450001.0.0.0; _ga_YZ2DWW9405=GS1.1.1708449986.9.1.1708450001.45.0.0; akavpau_vp_sams=1708450601~id=d2dbc62688eedb1c593b7010f5f80837; bm_sv=F38A402B385FF43B122F4B738E339103~YAAQBlLIFxNxzMWNAQAADzSOxxYbPy+/I2xuUMS9Kx566gEUyPXmPRC4i7HmOjwJ0/HT9/03fxTMuBB30gkh9hqYq1o/HKJaTRMUm/Wd37+Xn2qU1btaseCAPGOHgGQq6k+SSuQt/ckyKP+YAp6G1Gh0HFdeqxPClorQxQdcRYxdcIU9Vpnv/RHjh8fkIm5cUv47ZGNCGQP0SU45FoqUsxuaEYwyjdXEYWgzAP8Qi7gP4JKjhouYLwYXQaGIOnDrUQ==~1',
    referer:
      'https://www.sams.com.mx/rebajas/cat3030007?utm_native=cintillohome-rebajas',
    'sec-ch-ua':
      "'Not A(Brand';v='99', 'Google Chrome';v='121', 'Chromium';v='121'",
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': "'macOS'",
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent':
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    'x-requested-with': 'XMLHttpRequest',
  },
};