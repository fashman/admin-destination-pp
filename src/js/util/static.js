const staticData = {
  currency: [
    {name: '美金', code: 'USD'},
    {name: '英镑', code: 'GBP'},
    {name: '人民币', code: 'CNY'},
    {name: '港币', code: 'HKD'},
    {name: '澳门币', code: 'MOP'},
    {name: '欧元', code: 'EUR'},
    {name: '加币', code: 'CAD'},
    {name: '韩元', code: 'KRW'},
    {name: '日元', code: 'JPY'},
    {name: '澳币', code: 'AUD'},
    {name: '新西兰元', code: 'NZD'},
    {name: '瑞士法郎', code: 'CHF'},
    {name: '捷克克朗', code: 'CZK'},
    {name: '波兰兹罗提', code: 'PLN'},
    {name: '瑞典克朗', code: 'SEK'},
    {name: 'Norway-挪威克朗', code: 'NOK'},
    {name: '冰岛克朗', code: 'ISK'},
    {name: '新加坡', code: 'SGD'},
    {name: '俄罗斯卢布', code: 'RUB'},
  ],
  weekSelect: [
    {enName: 'Choose week', cnName:'请选择', code: ''},
    {enName: 'Monday', cnName:'周一', code: 'Monday'},
    {enName: 'Tuesday', cnName:'周二', code: 'Tuesday'},
    {enName: 'Wednesday', cnName:'周三', code: 'Wednesday'},
    {enName: 'Thursday', cnName:'周四', code: 'Thursday'},
    {enName: 'Friday', cnName:'周五', code: 'Friday'},
    {enName: 'Saturday', cnName:'周六', code: 'Saturday'},
    {enName: 'Sunday', cnName:'周日', code: 'Sunday'},
  ],
  countryAndCity: [
    {
      cnName: '美国',
      enName: 'USA',
      code: '0',
      citys: [
        {
          code: '118',
          cnName: '西雅图',
          enName: 'Seattle'
        },
        {
          code: '119',
          cnName: '洛杉矶',
          enName: 'City Of Los Angeles'
        },
        {
          code: '120',
          cnName: '旧金山',
          enName: 'San Francisco'
        },
        {
          code: '404',
          cnName: '华盛顿',
          enName: 'WashingtonDc'
        },
        {
          code: '92',
          cnName: '波士顿',
          enName: 'Boston'
        },
        {
          code: '153',
          cnName: '奥斯汀',
          enName: 'Austin'
        },
        {
          code: '103',
          cnName: '费城',
          enName: 'Philadelphia'
        },
        {
          code: 'POI_13787',
          cnName: '费尔班克斯',
          enName: 'Fairbanks'
        },
        {
          code: '138',
          cnName: '拉斯维加斯',
          enName: 'Las Vegas'
        },
        {
          code: '105',
          cnName: '奥兰多',
          enName: 'Orlando'
        },
        {
          code: '106',
          cnName: '迈阿密',
          enName: 'Miami'
        },
        {
          code: 'POI_123725',
          cnName: '可爱岛',
          enName: 'Kauai'
        },
        {
          code: '157',
          cnName: '底特律',
          enName: 'Detroit'
        },
        {
          code: '141',
          cnName: '芝加哥',
          enName: 'Chicago'
        },
        {
          code: '144',
          cnName: '新奥尔良',
          enName: 'New Orleans'
        },
        {
          code: '130',
          cnName: '盐湖城',
          enName: 'Salt Lake City'
        },
        {
          code: '2082',
          cnName: '安克雷奇',
          enName: 'Anchorage'
        },
        {
          code: '116',
          cnName: '亚特兰大',
          enName: 'Atlanta'
        },
        {
          code: '88',
          cnName: '纽约',
          enName: 'New York'
        },
        {
          code: '133',
          cnName: '凤凰城（菲尼克斯）',
          enName: 'Phoenix'
        },
        {
          code: '151',
          cnName: '圣安东尼奥',
          enName: 'San Antonio'
        },
        {
          code: '152',
          cnName: '休斯顿',
          enName: 'Houston'
        },
        {
          code: '136',
          cnName: '丹佛',
          enName: 'Denver'
        },
        {
          code: '121',
          cnName: '圣迭戈（圣地亚哥）',
          enName: 'San Diego'
        },
        {
          code: 'POI_13789',
          cnName: '苏厄德',
          enName: 'Seward'
        },
        {
          code: '2032',
          cnName: '劳德代尔堡',
          enName: 'Fort Lauderdale'
        },
        {
          code: '129',
          cnName: '波特兰',
          enName: 'Portland'
        },
        {
          code: '123',
          cnName: '圣莫妮卡',
          enName: 'Santa Monica'
        },
        {
          code: '139',
          cnName: '阿尔伯克基',
          enName: 'Albuquerque'
        },
        {
          code: '2026',
          cnName: '阿纳海姆',
          enName: 'Anaheim'
        },
        {
          code: '387',
          cnName: '蒙特雷',
          enName: 'Monterey'
        },
        {
          code: '1297',
          cnName: '长滩',
          enName: 'Long Beach'
        },
        {
          code: 'POI_123688',
          cnName: '纽瓦克',
          enName: 'Newark'
        },
        {
          code: 'POI_123714',
          cnName: '新墨西哥州圣菲',
          enName: 'Santa fe'
        },
        {
          code: 'POI_13627',
          cnName: '圣巴巴拉',
          enName: 'Santa Barbara'
        },
        {
          code: 'POI_123662',
          cnName: '伯克利',
          enName: 'Berkeley'
        },
        {
          code: 'POI_123761',
          cnName: '森尼维耳市',
          enName: 'Sunnyvale'
        },
        {
          code: 'POI_123781',
          cnName: '门洛帕克',
          enName: 'Menlo Park'
        },
        {
          code: 'POI_123814',
          cnName: '阿拉米达',
          enName: 'Alameda'
        },
        {
          code: '2228',
          cnName: '奥克兰（美国加州）',
          enName: 'Oakland'
        },
        {
          code: 'POI_123702',
          cnName: '圣克拉拉',
          enName: 'Santa Clara'
        },
        {
          code: 'POI_123703',
          cnName: '山景城',
          enName: 'Mountain View'
        },
        {
          code: 'POI_123723',
          cnName: '罗兰岗',
          enName: 'Rowland Heights'
        },
        {
          code: 'POI_123666',
          cnName: '纳帕',
          enName: 'Napa'
        },
        {
          code: 'POI_123765',
          cnName: '圣加布里埃尔',
          enName: 'San Gabriel'
        },
        {
          code: '124',
          cnName: '圣何塞',
          enName: 'San Jose'
        },
        {
          code: 'POI_123871',
          cnName: '埃默里维尔',
          enName: 'Emeryville'
        },
        {
          code: 'POI_13958',
          cnName: '卡梅尔',
          enName: 'Carmel'
        },
        {
          code: 'POI_123780',
          cnName: '米尔皮塔斯',
          enName: 'Milpitas'
        },
      ]
    },
    {
      cnName: '英国',
      enName: 'United Kingdom',
      code: 'POI_23375',
      citys: [
        {
          code: 'POI_23376',
          cnName: '伦敦',
          enName: 'London'
        },
        {
          code: 'POI_23703',
          cnName: '爱丁堡',
          enName: 'Edinburgh'
        },
        {
          code: 'POI_23765',
          cnName: '剑桥',
          enName: 'Cambridge'
        },
        {
          code: 'POI_23798',
          cnName: '牛津',
          enName: 'Oxford'
        },
        {
          code: 'POI_23823',
          cnName: '苏格兰高地',
          enName: 'ScottishHighlands'
        },
        {
          code: 'POI_23895',
          cnName: '英格兰湖区',
          enName: 'LakeDistrict'
        },
        {
          code: 'POI_24202',
          cnName: '圣安德鲁斯',
          enName: 'StAndrews'
        },
        {
          code: 'POI_24235',
          cnName: '威廉堡',
          enName: 'FortWilliam'
        },
        {
          code: 'POI_24242',
          cnName: '斯特灵',
          enName: 'Stirling'
        },
        {
          code: 'POI_24251',
          cnName: '莱斯特郡',
          enName: 'Leicester'
        },
        {
          code: 'POI_24288',
          cnName: '阿伯丁',
          enName: 'Aberdeen'
        },
        {
          code: 'POI_24297',
          cnName: '伯恩茅斯',
          enName: 'Bournemouth'
        },
        {
          code: 'POI_23861',
          cnName: '格拉斯哥',
          enName: 'Glasgow'
        },
        {
          code: 'POI_24271',
          cnName: '温彻斯特',
          enName: 'Winchester'
        },
        {
          code: 'POI_23799',
          cnName: '巴斯',
          enName: 'Bath'
        },
        {
          code: 'POI_23800',
          cnName: '曼彻斯特',
          enName: 'Manchester'
        },
        {
          code: 'POI_23801',
          cnName: '约克',
          enName: 'York'
        },
        {
          code: 'POI_23894',
          cnName: '利物浦',
          enName: 'Liverpool'
        },
        {
          code: 'POI_24361',
          cnName: '科茨沃尔德',
          enName: 'Cotswold'
        },
        {
          code: 'POI_123025',
          cnName: '英国湖区',
          enName: 'Lake District National Park'
        },
      ]
    },
    {
      cnName: '加拿大',
      enName: 'Canada',
      code: 'POI_13392',
      citys: [
        {
          code: 'POI_14239',
          cnName: '卡尔加里',
          enName: 'Calgary'
        },
        {
          code: '2094',
          cnName: '多伦多',
          enName: 'Toronto'
        },
        {
          code: '2096',
          cnName: '渥太华',
          enName: 'Ottawa'
        },
        {
          code: '2097',
          cnName: '蒙特利尔',
          enName: 'Montreal'
        },
        {
          code: '2104',
          cnName: '魁北克市',
          enName: 'Quebec City'
        },
        {
          code: '2164',
          cnName: '温哥华',
          enName: 'Vancouver'
        }
      ]
    },
    {
      cnName: '澳大利亚',
      enName: 'Australia',
      code: 'POI_14582',
      citys: [
        {
          code: 'POI_14583',
          cnName: '悉尼',
          enName: 'Sydney'
        },
        {
          code: 'POI_14584',
          cnName: '墨尔本',
          enName: 'Melbourne'
        },
        {
          code: 'POI_14585',
          cnName: '黄金海岸',
          enName: 'Gold Coast'
        },
        {
          code: 'POI_14587',
          cnName: '布里斯班',
          enName: 'Brisbane'
        },
        {
          code: 'POI_14588',
          cnName: '凯恩斯',
          enName: 'Cairns'
        },
        {
          code: 'POI_14589',
          cnName: '堪培拉',
          enName: 'Canberra'
        },
        {
          code: 'POI_14738',
          cnName: '阿德莱德',
          enName: 'Adelaide'
        },
        {
          code: 'POI_15120',
          cnName: '霍巴特',
          enName: 'Hobart'
        }
      ]
    },
    {
      cnName: '克罗地亚',
      enName: 'Croatia',
      code: 'POI_26489',
      citys: [
        {
          code: 'POI_26490',
          cnName: '杜布罗夫尼克',
          enName: 'Dubrovnik'
        },
        {
          code: 'POI_26529',
          cnName: '斯普利特',
          enName: 'Split'
        }
      ]
    },
    {
      cnName: '新西兰',
      enName: 'New Zealand',
      code: 'POI_14586',
      citys: [
        {
          code: 'POI_14591',
          cnName: '皇后镇',
          enName: 'Queenstown'
        },
        {
          code: 'POI_14592',
          cnName: '奥克兰',
          enName: 'Auckland'
        },
        {
          code: 'POI_14629',
          cnName: '基督城（克赖斯特彻奇）',
          enName: 'Christchurch'
        },
        {
          code: 'POI_14614',
          cnName: '罗托鲁瓦',
          enName: 'Rotorua'
        },
        {
          code: 'POI_123597',
          cnName: '瓦纳卡',
          enName: 'Wanaka'
        }
      ]
    }
  ]
};

export default staticData;
