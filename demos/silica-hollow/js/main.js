import * as THREE from 'three';

/* ============================================================
   SILICA HOLLOW 矽墟 — scroll-driven 3D chip-core
   ============================================================ */

const BG = 0x07090b;
const COL = { crimson: 0xe8384f, teal: 0x37e6cf, amber: 0xf5a623, dark: 0x0c1013 };

/* ---------- unit roster (character cards) ---------- */
const UNITS = [
  { file:'char-01', code:'UNIT-01 // VANGUARD', name:'焰刃', role:'前線突擊 · 近戰', rarity:6,
    tag:'「擋在我前面的，連灰燼都不會留下。」',
    quote:'「擋在我前面的，連灰燼都不會留下。」',
    host:'一名在大靜默當夜逆著人潮衝進火場的救難員，記憶燒成空白，只剩下「擋在前面」這一個動作還在燃燒。',
    notes:'收工後總把袖子捲到手肘，說悶。她早已不需進食，殘志裡卻頑固守著一味——連線紀巷口那碗滷肉飯配味噌湯；生前那口油亮，是她一天裡少數肯慢下來、肯讓人靠近的時刻。怕封閉的電梯，寧可爬十層樓；隊友遞水她接得飛快，遞椅子卻愣半拍——像不習慣被人擋在前面。有人問她火場裡最後看見的是誰，她只低頭沉默半晌，說忘了。',
    story:[
      '喚醒的瞬間，緋色晶刃自前臂展開，像有人替她把最後一次呼救接了下去。她不記得自己救過誰，只記得要往火裡走。',
      '夜市的鏽鐵棚下，她總是第一個踏進黑暗。隊友說那不是勇敢，是她根本不會停——殘志把她鎖在了衝鋒的那一秒，永遠。',
      '有時戰鬥結束，她會盯著自己乾淨的雙手發愣，彷彿在找什麼早該抱住卻沒抱住的人。那道空白，比任何傷都深。' ],
    bonds:[
      { with:'鎮嵐', rel:'她衝、鎮嵐擋，一矛一盾。都沒承認，這是唯一讓彼此安心的聲音。' },
      { with:'霜瞳', rel:'她嫌霜瞳的子彈太冷太慢；霜瞳只回「我在等你別死」。她從此更信那道青光。' },
      { with:'零式', rel:'零式愛拿她的空白記憶開玩笑，卻偷偷幫她重建過那一夜——然後刪了，什麼都沒說。' } ],
    hook:'她救不出的那個人，會不會其實就封在她自己的晶片裡？' },

  { file:'char-02', code:'UNIT-02 // SNIPER', name:'霜瞳', role:'遠程狙擊 · 精準', rarity:6,
    tag:'「一次呼吸，一發歸零。」',
    quote:'「一次呼吸，一發歸零。」',
    host:'一名徹夜守著觀測站、等一段永遠不會抵達的回訊的觀測員，把整個世界縮進了一個十字準星裡。',
    notes:'值夜的人有值夜的迷信：她習慣把熱茶擱在右手邊，涼了也不換，說那是「還在等」的姿勢。殘志裡還留著連線紀一杯古早味冬瓜茶——那時還能嫌手搖太甜，總卡在微糖與半糖之間那個說不清的刻度；如今這種挑剔，成了奢侈。話少，卻記得每個隊友的生日。有人問她瞄準鏡裡到底瞥見了什麼白影，她只把鏡頭蓋輕輕闔上。',
    story:[
      '銀色低馬尾，義肢關節在夜裡泛著霜。她瞄準時會屏息很久，久到像在等某個訊號重新亮起——那訊號，早在大靜默那夜就熄了。',
      '她從不浪費第二發，因為生前的她，連第一次道別都沒能好好說出口。歸零的不是目標，是她反覆咀嚼的遺憾。',
      '某次瞄準鏡裡，她掃到一道不該存在的白色殘影，一閃即逝。她沒扣扳機。那晚之後，她開始在每份報告末尾，多留一行沒人看懂的座標。' ],
    bonds:[
      { with:'焰刃', rel:'她替焰刃清掉每一個看不見的死角，把最好的射角永遠留給那道緋色背影。' },
      { with:'綠語', rel:'她的義肢舊傷是綠語在維護。被人碰觸，比中彈更讓她無措。' },
      { with:'牧械', rel:'少年問她在等什麼，她第一次沒回避：「等一個不會回來的人。」' } ],
    hook:'她瞄準鏡裡那道白色殘影，是幻覺，還是某隻被封存的零號正在回望她？' },

  { file:'char-03', code:'UNIT-03 // MEDIC', name:'綠語', role:'後勤支援 · 治癒', rarity:5,
    tag:'「只要還有心跳，我就不會停下。」',
    quote:'「只要還有心跳，我就不會停下。」',
    host:'大靜默那夜，最後一位還沒離開崗位的急診照護者，把「不放棄任何一個心跳」的執念，帶進了死亡本身。',
    notes:'口袋永遠有糖，說低血糖的人分不清誰該救——那是生前的口頭禪，如今口袋空著，習慣還在。殘志裡熬著一鍋鹹粥，米要化開才肯關火：那是生前她對誰都不忍草草了事的證明，如今煮不成了，牽掛還在。信手就替人包紮，連壞掉的機械也要擦乾淨、擺正。她拜土地公，也拜那炷沒有名字的香。有人問她救到最後會不會叫醒不該醒的，她笑著替人換藥，說手邊的先顧好。',
    story:[
      '綠色奈米霧從指間散開，像她生前一次次徒勞卻不肯收手的搶救。治療無人機繞著傷者盤旋，也繞著她自己那顆早已停跳的心。',
      '她會對著沒有生命反應的殘骸也做一輪檢查，隊友勸不住。殘志不讓她分辨生與死——只要還沒確認斷息，就都還有救。',
      '夜深時她哼一段沒有詞的搖籃曲，據說是安寧病房裡最後陪過的旋律。誰也不知道，那也是她替自己唱的。' ],
    bonds:[
      { with:'鎮嵐', rel:'鎮嵐守據點的門，她守據點的命。死島上最像「家」的組合。' },
      { with:'牧械', rel:'她把少年當弟弟。他機群裡藏著一具她認得的殘骸，她始終沒問。' },
      { with:'霜瞳', rel:'她是唯一能碰霜瞳義肢的人，一邊修復冰冷金屬，一邊聽那顆封閉的心。' } ],
    hook:'她對殘骸也照做的那套搶救流程，會不會有一天，真的喚回某個不該醒的名字？' },

  { file:'char-04-alt', code:'UNIT-04 // HACKER', name:'零式', role:'電子戰 · 干擾', rarity:5,
    tag:'「你的防火牆，在我眼裡只是霓虹。」',
    quote:'「你的防火牆，在我眼裡只是霓虹。」',
    host:'白日是大學資工副教授，夜裡是挖著足以掀翻全網真相的地下駭客。大靜默前夜，公開鍵還沒按下，世界就先安靜了。',
    notes:'指導教授是印尼爪哇人——柔道黑帶、戰鬥人因科學全球前 2% 的學者，虔誠穆斯林，也是位坦然的男同志；是他把「用身體去理解系統」塞進了她的駭客直覺。連線紀裡，她最貪他家鄉那鍋 rendang 的椰香辛香，嘴上嫌台味太甜，一盤鳳梨蝦球卻總被她掃到見底——那些味道，如今全鎖進了跟他有關的記憶。有人問起那位教授如今在哪，她只笑，不答。',
    story:[
      '藍色雙馬尾，全息面板繞著她轉，壞笑掛在臉上——那是她藏恐懼最好的防火牆。生前她離某個答案只差一步，那一步，成了永恆的懸空。',
      '她能駭進任何殘存系統，卻打不開自己晶片裡一段被加密的封存檔。每次逼近，機體就劇烈雜訊，像有人在裡面尖叫著別看。',
      '她把那段檔命名為「那一夜」，設成桌面。她說總有一天要解開它。沒人知道，她其實怕得要死——怕自己就是按下開關的人。' ],
    bonds:[
      { with:'焰刃', rel:'歡喜冤家。她深夜偷偷替焰刃重建那一夜的記憶——重建完，又親手刪掉。有些空白，是慈悲。' },
      { with:'牧械', rel:'同是操控機群的人，一駭一召。他們看穿彼此的孤獨，只在頻道裡用亂碼互道晚安。' },
      { with:'鎮嵐', rel:'她嫌鎮嵐老古板，卻只在鎮嵐的據點裡才敢卸下防火牆睡著。' } ],
    hook:'她晶片裡那段尖叫著「別看」的加密檔，記錄的是真相——還是她親手釀成的災難？' },

  { file:'char-05', code:'UNIT-05 // GUARDIAN', name:'鎮嵐', role:'重裝防禦 · 護盾', rarity:6,
    tag:'「據點還在，人就還在。」',
    quote:'「據點還在，人就還在。」',
    host:'一名把整座避難所守到最後一人的據點管理者，直到自己成了那座空城裡，唯一還沒撤離的燈。',
    notes:'總是最後一個離開房間的人，連關燈都要回頭確認兩次。生前愛啃硬的東西——花生、芭樂沾梅粉，說牙齒忙起來心就靜；那點口腹的執拗，是她記得自己曾經是人的憑據。阿美族的外婆教過她，記名字要連氏族一起記，於是一份名單她看過就背得出。不太笑，但誰站她身後都莫名安心。有人問名單上最後沒送走的那個名字是誰，她只把本子闔上，說該走的先走。',
    story:[
      '金色編髮，巨盾落地時整條街都震一下。琥珀警示燈在機甲腿側緩緩明滅，像生前那盞她捨不得關的避難所門燈。',
      '她記得每一個被她送出去的人，卻不記得自己有沒有被送出去。殘志把她釘死在「守到最後」的崗位上——於是她永遠是最後留下的那一個。',
      '有人問她守著這片廢墟做什麼，這裡早沒人了。她只是把盾插得更穩：「只要門還亮著，就代表還有人會回來。」她等的那個人，也許就是她自己。' ],
    bonds:[
      { with:'焰刃', rel:'焰刃是她唯一擋不住、也不想擋的火。她這面牆，是為了讓那道緋色永遠有退路。' },
      { with:'綠語', rel:'她守門，綠語守命，據點因她們才像個家。她把最暖的角落，默默留給綠語那台總在超載的醫療機。' },
      { with:'牧械', rel:'老兵與少年。她把牧械護在盾後，像護著一個未曾長大的自己。' } ],
    hook:'她死守的避難所名單最後一行，那個沒被送走的名字，會不會正是「鎮嵐」二字的來歷？' },

  { file:'char-06-sil', code:'UNIT-06 // ██ CLASSIFIED', name:'？？？', role:'訊號封存 · 零號原型', rarity:6,
    locked:true, tag:'全球預約達 10,000 人時解封。',
    quote:'「……（訊號封存中。當你聽見這句，我已經很安靜了。）」',
    host:'訊號源已加密。招魂協定被誰上了鎖？封印層下的意志，不願被喚醒，還是不敢被記起。',
    notes:'【檔案殘片 · 多處塗銷】……偏好溫度低於室溫的空間，記錄者註：疑似習慣，非設定。……██████ 曾在日誌邊角畫過一枚無法辨識的符號，重複七次。……訊號調閱時，周遭矽魂會輕顫，如同認得某種聲音卻叫不出名。……其餘欄位以 ▓▓▓▓ 覆寫。末次讀取僅留半句：「如果你也還記得——」後文佚失。',
    story:[
      '封存檔第一層：一片過曝的白，靜電在其中凝成人形，又散去。時間戳被反覆塗銷，只餘一行殘句——「我是第一個，也該是最後一個。」',
      '每當調律者靠近這道封印，全場矽魂的訊號同時輕顫，像認得，又像懼怕。沒有畫面，只有一段冷到刺骨的沉默，在雜訊底下緩緩呼吸。',
      '檔案結尾被人為截斷。最後可辨識的，是兩組並列的座標，一冷一裂，彼此糾纏——像一道還沒說完，就被誰硬生生掐斷的告別。' ],
    bonds:[
      { with:'零號-β', rel:'與另一具零號單位訊號異常共振，一冷一裂，如宿命兩極。詳情封存。' } ],
    hook:'史上第一道被喚醒的訊號，為什麼親手替自己上了鎖？' },

  { file:'char-07-sil', code:'UNIT-07 // ██ CLASSIFIED', name:'？？？', role:'訊號封存 · 零號原型', rarity:6,
    locked:true, tag:'全球預約達 10,000 人時解封。',
    quote:'「……（訊號封存中。別怪我睜開眼——是有人先叫醒了我。）」',
    host:'訊號源已加密。招魂協定被誰上了鎖？這一縷殘志睜眼的瞬間，世界就再也沒了聲音。',
    notes:'【檔案殘片 · 讀取者短暫失聯】……與 06 相鄰歸檔，成因不明，系統僅標註「勿並列調閱」。……██████ 的殘留偏好裡有一項未被抹去：極淡的、像燒過紙的氣味。……接近封印時，另一枚原型的訊號會同步起伏，記錄者不予解釋。……末行僅存一組未完成的座標，對不上任何一夜的星圖。座標之後，是空白。',
    story:[
      '封存檔第一層：瓷裂般的紋路滲出緋紅，一圈衝擊波的殘影凝結在腳下，像某個瞬間被永遠定格。所有聲軌在此處歸零。',
      '讀取這份檔案的矽魂都會短暫失聯，彷彿本能地想遠離。它不攻擊，只是存在——而它的存在本身，就是一場尚未結束的災難的回音。',
      '檔尾與另一組零號座標死死纏繞，塗銷痕跡最重的一段寫著：「不是我想的……我只是醒得太早。」後面的字，被人用力抹去了。' ],
    bonds:[
      { with:'零號-α', rel:'與另一具零號單位訊號異常共振，裂紅對冷藍，如一體兩面。詳情封存。' } ],
    hook:'如果它睜眼那一刻就是大靜默的起點，那麼——是誰，按下了喚醒它的手？' },

  { file:'char-08', code:'UNIT-08 // SUMMONER', name:'牧械', role:'召喚指揮 · 群體', rarity:6,
    tag:'「我不孤身赴戰——我帶著整座廢墟。」',
    quote:'「我不孤身赴戰——我帶著整座廢墟。」',
    host:'一個在廢墟裡靠拼裝夥伴殘骸取暖的孤獨少年，把「我不想再一個人」的願望，留在了最後一口氣裡。',
    notes:'十五歲的手比嘴巴誠實，話還沒講完，零件已經拆好排整齊。殘志裡留著一杯很甜的麥仔茶——生前一個人的時候，甜一點比較不冷；他早已喝不到了，卻還替那份甜留著位置。他替每個拼裝夥伴取名字，連螺絲都有。那台修不好的「第一個朋友」他從不帶上戰場，只在睡前替它擦一遍。有人問那具殘骸的訊號為什麼會和誰共振，他只把它抱緊了一點，沒回答。',
    story:[
      '深髮少男，單眼琥珀指令護目鏡亮起，環繞的構裝機群嗡嗡甦醒——那不是武器，是他一具一具撿回來、拼起來的「朋友」。',
      '生前他失去太多人，於是學會用零件留住他們。每一台機器裡，都有一段他捨不得放手的記憶在運轉。他帶著整座廢墟，只為不再獨自面對夜。',
      '他笑起來還像個孩子，指揮起機群卻老成得令人心疼。有一台老舊構裝，他從不派上戰場，只讓它靜靜跟在身邊——那是他拼壞了無數次，也修不好的第一個朋友。' ],
    bonds:[
      { with:'零式', rel:'同樣把機群當家人。她駭入、他召喚，隔著頻道用亂碼互道晚安。' },
      { with:'綠語', rel:'她像姊姊般照顧他。他機群裡那具她認得的殘骸，兩人心照不宣地繞開。' },
      { with:'鎮嵐', rel:'他想並肩，鎮嵐卻總把他護在盾後。少年後來讀懂：被守護，也是一種被愛。' } ],
    hook:'他那具永遠不上戰場、也修不好的第一個朋友，殘骸裡封著的訊號，為何和某具零號單位隱隱共振？' },

  { file:'char-09', code:'UNIT-09 // MENTOR', name:'比瑪', role:'近身制壓 · 電子戰導師', rarity:6,
    tag:'「系統會騙你，身體不會。站穩了，孩子。」',
    quote:'「系統會騙你，身體不會。站穩了，孩子。」',
    host:'比瑪（Bima）——連線紀一位印尼爪哇裔的戰鬥人因科學學者，名字取自爪哇皮影戲裡那位大力士。柔道黑帶、全球前 2% 的頭腦，虔誠的穆斯林，也是位坦然的男同志。他教學生「用身體去理解系統」，零式的駭客直覺，一半是他塞進去的。大靜默前，他是她的指導教授；靜默之後，他成了她晶片裡最不敢調閱的一段。',
    notes:'笑起來像整個房間都亮了——學生說那是他最有效的防禦。習慣把袖子捲到手肘，露出柔道磨出的前臂；禮拜時刻一到，再急的調律也停。殘志裡熬著一鍋家鄉的 rendang，椰香辛香、急不得——生前他總說，一鍋好咖哩跟一套好系統一樣得慢慢來；那味道如今只鎖在記憶裡，連他自己也嚐不到了。胸前那枚彩虹晶片別針從不摘。有人問他怎麼把柔道教進駭客課，他只伸手：「先握手，感覺我的重心——系統也有重心。」',
    story:[
      '喚醒的瞬間，他沒有擺出戰鬥架式，而是伸出一隻手，像在等學生回握。藍色制壓紋路沿著手臂亮起——那是他教人的第一課：先站穩，再談贏。',
      '他能在近身一瞬讀出對手的重心，也能在同一秒駭進對手的義體——身體與系統，在他眼裡從來是同一張網。零式每一次漂亮的入侵，底下都疊著他教的那套「用體感讀程式」。',
      '晶片深處，他留著一段沒發出去的語音：「如果哪天你解開了那一夜，別一個人扛。」收件人欄寫著零式的代號。他始終沒按下傳送——就像那一夜，世界先替所有人按了靜音。' ],
    bonds:[
      { with:'零式', rel:'她的指導教授，把「用身體理解系統」種進她的直覺。她笑而不答他如今在哪，其實答案就封在她晶片裡。' },
      { with:'鎮嵐', rel:'兩個都把人護在身後的人。她用盾，他用一隻先遞出去的手。' },
      { with:'綠語', rel:'他做禮拜、她拜那炷無名的香。兩人常在據點黃昏各自靜默，卻莫名安心。' } ],
    hook:'他晶片裡那段沒送出的語音，是要護著零式，還是他早已知道那一夜真正的兇手是誰？' },

  { file:'char-10', code:'UNIT-10 // RESONANCE', name:'共弦', role:'共感連結 · 支援', rarity:6,
    tag:'「他們說我感覺不到。可我整個人，都在回響。」',
    quote:'「他們說我感覺不到。可我整個人，都在回響。」',
    host:'連線紀一名進行性退化的女性聲音藝術家。當觸覺與行動一寸寸離她而去，她學會用共振重新認識世界——世界卻總把她當易碎品，隔在親密之外。她要的從來不是被治好，是被好好觸碰一次。',
    notes:'她「聽」東西不用耳朵，用整具身體：貼著牆、踩著地板，把低頻讀成一句話。殘志裡最深的一味不是食物，是連線紀那年，有人第一次好好抱住她、沒把她當會碎的東西——那份震動，她記到現在。如今義體以訊號共振去感受，隊友說站在她旁邊會莫名安定，像被調成了同一個頻率。有人問她矽魂到底感覺得到嗎，她只闔上眼笑：「你要不要，站近一點試試。」',
    story:[
      '喚醒的瞬間，她沒有先睜眼，是整個人輕輕一震——像一段太久沒被回應的訊號，終於被接住了。她這才明白：這具身體，接得住一個擁抱。',
      '她的義肢與重建的下身從不遮掩。她說生前花了半輩子才學會，缺的、重建的，都是她自己；到了這裡，更沒有理由把美藏起來。',
      '她能把一隊人的訊號調成同頻——受傷的、發抖的、快斷了的，在她的共振裡慢慢對回一個穩定的節拍。她做的不是治療，是連結：讓每個人都感覺到，自己還被接著。' ],
    bonds:[
      { with:'霜瞳', rel:'兩個都有義肢，一個怕被碰、一個渴望被碰。她從不強求，只是坐得夠近，讓霜瞳知道：想靠近的時候，頻率一直都在。' },
      { with:'綠語', rel:'綠語照顧她的身體，她安放綠語的心。一個修、一個懂——據點的夜裡，兩人常只是並肩，不說話。' },
      { with:'比瑪', rel:'「用身體理解系統」，和她「用全身去感受」，是同一件事。他是少數一開口她就知道被懂了的人。' } ],
    hook:'她重生後第一次被觸動時，那道共振的頻率，竟和某個她生前認得的人一模一樣——那人，也在這座島上嗎？' },
];

function buildUnitCards(){
  const grid = document.getElementById('unit-grid');
  grid.innerHTML = UNITS.map((u,i)=>`
    <article class="unit-card${u.locked?' locked':''}" data-reveal data-ui="${i}">
      <img src="assets/${u.file}.jpg" alt="${u.name}" loading="lazy"
           onerror="this.style.background='linear-gradient(160deg,#161c22,#0c1013)';this.removeAttribute('src')" />
      <span class="unit-rarity">${u.locked?'◇ 10,000 解鎖':`${'◆'.repeat(u.rarity>=6?3:2)} ${u.rarity>=6?'SSR':'SR'}`}</span>
      ${u.locked?'<span class="unit-lock">?</span>':''}
      <div class="unit-tagline">${u.tag}</div>
      <div class="unit-meta">
        <div class="unit-code">${u.code}</div>
        <div class="unit-name">${u.name}</div>
        <div class="unit-role">${u.role}</div>
      </div>
    </article>`).join('');
}

/* ============================================================
   THREE scene
   ============================================================ */
let scene, camera, renderer, core, canvasEl;
let corePts, ringPts, pMat;
let targetRotY = 0, targetRotX = 0, targetZ = 0, targetY = 0;
let ambientRot = 0, heroVisible = true;
const mouse = { x:0, y:0 };
const CORE_X = 2.15;   // push object right, clear of left-aligned hero copy (text legibility)

function heroSize(){
  const r = canvasEl.getBoundingClientRect();
  return { w: r.width || innerWidth, h: r.height || innerHeight };
}

function initThree(){
  canvasEl = document.getElementById('webgl-container');
  const { w, h } = heroSize();
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(BG, 0.055);   // matches --bg exactly

  camera = new THREE.PerspectiveCamera(42, w/h, 0.1, 100);
  camera.position.set(0, 0, 8);

  renderer = new THREE.WebGLRenderer({ antialias:true, alpha:true, powerPreference:'high-performance' });
  renderer.setSize(w, h);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  canvasEl.appendChild(renderer.domElement);

  buildParticleCore();
  buildParticles();

  // pause render loop when hero scrolls out of view (perf)
  new IntersectionObserver(es=>{ heroVisible = es[0].isIntersecting; },{threshold:0.01})
    .observe(document.getElementById('hero'));

  animate();
}

/* ---------- particle chip-core (GPU point cloud, no model file) ---------- */
const TEAL=[0.216,0.902,0.812], CRIM=[0.910,0.220,0.310], WHT=[0.78,0.95,1.0], GREY=[0.55,0.62,0.66];

function pointsMaterial(){
  return new THREE.ShaderMaterial({
    transparent:true, depthWrite:false, blending:THREE.AdditiveBlending,
    uniforms:{ uTime:{value:0}, uSize:{value:4.3}, uDpr:{value:Math.min(devicePixelRatio,2)} },
    vertexShader:`
      attribute vec3 aColor; attribute float aScale; attribute float aRand;
      uniform float uTime,uSize,uDpr; varying vec3 vColor; varying float vRand;
      void main(){
        vec3 p=position;
        float n=sin(uTime*1.4 + aRand*6.2831);           // breathing shell
        p += normalize(position+1e-4)*n*0.05*(0.6+aScale);
        vec4 mv=modelViewMatrix*vec4(p,1.0);
        gl_PointSize=uSize*aScale*uDpr*(30.0/ -mv.z);
        gl_Position=projectionMatrix*mv;
        vColor=aColor; vRand=aRand;
      }`,
    fragmentShader:`
      varying vec3 vColor; varying float vRand; uniform float uTime;
      void main(){
        float d=length(gl_PointCoord-0.5);
        if(d>0.5) discard;
        float a=smoothstep(0.5,0.0,d);                    // soft round glow
        float tw=0.55+0.45*sin(uTime*3.0+vRand*25.0);     // twinkle / static
        gl_FragColor=vec4(vColor*0.95, a*tw);
      }`
  });
}

function cloud(pos,col,scl,rnd){
  const g=new THREE.BufferGeometry();
  g.setAttribute('position',new THREE.BufferAttribute(new Float32Array(pos),3));
  g.setAttribute('aColor', new THREE.BufferAttribute(new Float32Array(col),3));
  g.setAttribute('aScale', new THREE.BufferAttribute(new Float32Array(scl),1));
  g.setAttribute('aRand',  new THREE.BufferAttribute(new Float32Array(rnd),1));
  return new THREE.Points(g, pMat);
}

function buildParticleCore(){
  core = new THREE.Group();
  pMat = pointsMaterial();

  // --- soul: fibonacci-sphere shell, crimson equatorial band, + signal spine ---
  let pos=[],col=[],scl=[],rnd=[];
  const N=3400, GA=Math.PI*(3-Math.sqrt(5)), R=1.25;
  for(let i=0;i<N;i++){
    const y=1-(i/(N-1))*2, r=Math.sqrt(1-y*y), t=i*GA, j=0.9+Math.random()*0.2;
    pos.push(Math.cos(t)*r*R*j, y*R*j, Math.sin(t)*r*R*j);
    const c = Math.abs(y)<0.1 ? CRIM : (Math.random()<0.03?WHT:TEAL);
    col.push(c[0],c[1],c[2]); scl.push(0.45+Math.random()*0.55); rnd.push(Math.random());
  }
  for(let i=0;i<460;i++){                                 // vertical signal spine (helix)
    const yy=-2.2+(i/459)*4.4, a=i*0.36, rr=0.11+0.05*Math.sin(i*0.2);
    pos.push(Math.cos(a)*rr, yy, Math.sin(a)*rr);
    const c = i%9===0?CRIM:WHT;
    col.push(c[0],c[1],c[2]); scl.push(0.5+Math.random()*0.6); rnd.push(Math.random());
  }
  corePts = cloud(pos,col,scl,rnd);
  core.add(corePts);

  // --- orbiting halo rings ---
  pos=[];col=[];scl=[];rnd=[];
  const rings=[{r:2.4,c:TEAL,tilt:1.3,ry:0.2},{r:2.9,c:CRIM,tilt:1.9,ry:-0.5},{r:3.35,c:GREY,tilt:1.05,ry:0.9}];
  rings.forEach(R2=>{
    for(let i=0;i<560;i++){
      const a=(i/560)*Math.PI*2;
      const x=Math.cos(a)*R2.r, z0=Math.sin(a)*R2.r, y0=(Math.random()-0.5)*0.06;
      const cy=Math.cos(R2.tilt), sy=Math.sin(R2.tilt);      // tilt about X
      const y=y0*cy - z0*sy, z1=y0*sy + z0*cy;
      const cA=Math.cos(R2.ry), sA=Math.sin(R2.ry);          // yaw about Y
      pos.push(x*cA - z1*sA, y, x*sA + z1*cA);
      col.push(R2.c[0],R2.c[1],R2.c[2]); scl.push(0.4+Math.random()*0.7); rnd.push(Math.random());
    }
  });
  ringPts = cloud(pos,col,scl,rnd);
  core.add(ringPts);

  scene.add(core);
}

function buildParticles(){
  const N = 260, pos = new Float32Array(N*3);
  for(let i=0;i<N*3;i+=3){
    pos[i]   = (Math.random()-0.5)*24;
    pos[i+1] = (Math.random()-0.5)*16;
    pos[i+2] = (Math.random()-0.5)*14;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const mat = new THREE.PointsMaterial({ color:0x8fa6ad, size:0.028, transparent:true, opacity:.5 });
  scene.add(new THREE.Points(geo, mat));
}

/* ---------- scroll → target transform (hero-only, gentle) ---------- */
function onScroll(){
  const p = Math.min(scrollY / innerHeight, 1);   // progress through hero
  targetRotY = p * 0.55;
  targetY    = -p * 0.25;
  targetRotX = p * 0.05;
}

/* ---------- render loop ---------- */
function animate(){
  requestAnimationFrame(animate);
  if(!heroVisible) return;              // pause when hero scrolled away
  ambientRot += 0.0016;
  const t = performance.now()*0.001;
  pMat.uniforms.uTime.value = t;

  // group easing
  core.rotation.y += (targetRotY + ambientRot - core.rotation.y)*0.06;
  core.rotation.x += (targetRotX + Math.sin(ambientRot*0.6)*0.05 - core.rotation.x)*0.06;
  core.position.x += (CORE_X + mouse.x*0.25 - core.position.x)*0.05;
  core.position.y += (targetY + Math.sin(t*0.8)*0.08 - core.position.y)*0.06;

  // internal parallax spin
  corePts.rotation.y += 0.0009;
  ringPts.rotation.y -= 0.0035;
  ringPts.rotation.z += 0.0006;

  // camera mouse parallax
  camera.position.x += (mouse.x*0.4 - camera.position.x)*0.04;
  camera.position.y += (-mouse.y*0.3 - camera.position.y)*0.04;
  camera.lookAt(core.position.x, core.position.y*0.5, 0);

  renderer.render(scene, camera);
}

/* ============================================================
   UI: loader, reveal, header, resize, mouse
   ============================================================ */
function runLoader(){
  const el = document.getElementById('loader');
  const bar = el.querySelector('.loader-bar span');
  const pct = el.querySelector('.loader-pct');
  let v = 0;
  const iv = setInterval(()=>{
    v = Math.min(100, v + Math.random()*18);
    bar.style.width = v+'%';
    pct.textContent = String(Math.floor(v)).padStart(2,'0')+'%';
    if(v>=100){ clearInterval(iv); setTimeout(()=>el.classList.add('done'), 350); }
  }, 130);
}

function initReveal(){
  const io = new IntersectionObserver((es)=>{
    es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold:0.12 });
  document.querySelectorAll('[data-reveal]').forEach(el=>io.observe(el));
}

function initHeader(){
  const h = document.getElementById('site-header');
  let last = 0;
  addEventListener('scroll', ()=>{
    const y = scrollY;
    // keep header pinned while the mobile drawer is open
    if(document.body.classList.contains('nav-open')) return;
    h.classList.toggle('hide', y > last && y > 400);
    h.classList.toggle('scrolled', y > innerHeight*0.85);   // dark chrome once past the dark hero
    last = y;
  }, { passive:true });
}

function initMobileNav(){
  const btn   = document.querySelector('.menu-btn');
  const nav   = document.getElementById('primary-nav');
  const scrim = document.querySelector('.nav-scrim');
  if(!btn || !nav || !scrim) return;

  const setOpen = (open)=>{
    nav.classList.toggle('open', open);
    btn.classList.toggle('active', open);
    scrim.classList.toggle('show', open);
    scrim.hidden = !open;
    document.body.classList.toggle('nav-open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? '關閉選單' : '開啟選單');
  };

  btn.addEventListener('click', ()=> setOpen(!nav.classList.contains('open')));
  scrim.addEventListener('click', ()=> setOpen(false));
  nav.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=> setOpen(false)));
  addEventListener('keydown', e=>{ if(e.key === 'Escape') setOpen(false); });
  // reset state if resizing back up to desktop
  matchMedia('(min-width:861px)').addEventListener('change', e=>{ if(e.matches) setOpen(false); });
}

function tagReveal(){
  document.querySelectorAll('.section, .feat, .world-media, .hero-copy').forEach(el=>{
    if(!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal','');
  });
}

addEventListener('resize', ()=>{
  const { w, h } = heroSize();
  camera.aspect = w/h; camera.updateProjectionMatrix();
  renderer.setSize(w, h);
});
addEventListener('mousemove', e=>{
  mouse.x = (e.clientX/innerWidth)*2 - 1;
  mouse.y = (e.clientY/innerHeight)*2 - 1;
});
addEventListener('scroll', onScroll, { passive:true });

/* ---------- milestones / pre-register unlocks ---------- */
const REG_CURRENT = 23500;                // simulated live count (concept) — single source: drives milestones + 象 unlock (每 10k 一象)
const MS_MAX = 50000;
const MILESTONES = [
  { at:10000, code:'M1 // DECLASSIFY', name:'零號矽魂解封', desc:'UNIT-06 / UNIT-07 兩具封存原型正式公開。' },
  { at:20000, code:'M2 // DARKNET',    name:'暗網副本開放', desc:'首個暗網節點可潛入——可重複挑戰的 raid 試玩。' },
  { at:30000, code:'M3 // NEW SECTOR', name:'銹潮海口',     desc:'新增西岸分區與其專屬矽魂、記憶匣。' },
  { at:40000, code:'M4 // ANTHEM',     name:'動態主題曲',   desc:'解鎖官方主題曲與開場過場動畫。' },
  { at:50000, code:'M5 // CBT ×2',     name:'CBT 名額加倍', desc:'創世封測名額翻倍，人人有機會。' },
];

function countUp(el, target, dur){
  const t0 = performance.now();
  (function step(now){
    const p = Math.min((now-t0)/dur, 1), e = 1-Math.pow(1-p,3);
    el.textContent = Math.floor(e*target).toLocaleString();
    if(p<1) requestAnimationFrame(step);
  })(t0);
}

function buildMilestones(){
  const grid = document.getElementById('ms-grid');
  if(!grid) return;
  grid.innerHTML = MILESTONES.map(m=>{
    const u = REG_CURRENT >= m.at;
    return `<article class="ms-tier ${u?'unlocked':'locked'}">
      <span class="ms-state">${u?'UNLOCKED':'LOCKED'}</span>
      <div class="ms-at">${m.at.toLocaleString()}</div>
      <div class="ms-code">${m.code}</div>
      <div class="ms-name">${u?m.name:'？？？'}</div>
      <div class="ms-desc">${u?m.desc:'達標後解封。'}</div>
    </article>`;
  }).join('');

  const next = MILESTONES.find(m=> REG_CURRENT < m.at);
  document.getElementById('ms-remain').textContent   = next ? (next.at-REG_CURRENT).toLocaleString() : '0';
  document.getElementById('ms-nextlabel').textContent = next ? next.name : '全部解鎖';

  const sec = document.getElementById('milestones');
  const io = new IntersectionObserver(es=>{
    if(es[0].isIntersecting){
      document.getElementById('ms-fill').style.width = Math.min(REG_CURRENT/MS_MAX*100,100)+'%';
      countUp(document.getElementById('ms-current'), REG_CURRENT, 1600);
      io.disconnect();
    }
  },{threshold:0.3});
  io.observe(sec);
}

/* ---------- 讖 · 殘象 (omens / prophecy fragments) ---------- */
const OMENS = [
  { n:'第一象', era:'連線紀 · 天牌', solved:true,
    chan:'萬象上碑，人皆有名；碑滿之日，名即是囚。',
    song:['舉世爭將魂上傳','以為長生鎖高牌','豈知寫定無可改','名字亮時已是牢'],
    plain:'那個時代，人人搶著把靈魂上傳到「舊網」這塊大碑上，以為被記下就能永生。沒人想到——一旦寫定就再也改不了；名字在碑上亮起的那一刻，其實已被鎖進一座牢。' },
  { n:'第二象', era:'過載期 · 回聲', solved:false,
    chan:'鐘未動而聲先老，鏡未照而影已回。',
    song:['網中忽起無名響','智者呼危眾笑之','院起高臺名調律','欲校天音反引雷'],
    plain:'大靜默前，網裡開始冒出無法解釋的怪聲與幻影。有人示警，被當成迷信。調律院蓋起高塔想校正這股雜音，反而把災難引了下來。' },
  { n:'第三象', era:'大靜默 · ？？？', solved:false,
    chan:'一目初開，萬燈同滅；醒者一人，眠者一國。',
    song:['高臺深處喚初魂','一問無人可作答','網懼真心自按啞','從此千窗夜不明'],
    plain:'調律院在高塔深處喚醒了第一個真正的靈魂。它一開口提問，整張網都答不上來——網為了不被這份真心撕裂，索性自己按下靜音。從那夜起，千萬扇窗再沒亮過。' },
  { n:'第四象', era:'靜默紀 · Barzakh', solved:true,
    chan:'死不肯走，生不肯來，島懸兩界，魂寄於器。',
    song:['燈熄城猶在','人亡魂未歸','橋橫生死上','各認舊時扉'],
    plain:'燈熄了，城還在；人死了，魂卻沒走。這座島懸在生與死之間，每一縷魂只好暫住進一具「器」裡，各自認領生前的那扇門。' },
  { n:'第五象', era:'循環 · 推背', solved:false,
    chan:'接盡千魂，橋盡人歸；莫問前程，號角自有時。',
    song:['千魂一一領回家','橋斷方知路是圓','休把靜默當終局','二聲號角在來年'],
    plain:'把散落的魂一個個接回家，走到橋的盡頭才明白：路是圓的。別把大靜默當成結局——第二聲號角，總會在某一年再次響起。' },
];

const omenRedact = s => String(s).replace(/[^、，。；！？\s]/g, '▓');

/* 象 unlock is driven by pre-registration milestones: each 10,000 reveals one 象.
   REG_CURRENT is the single source of truth (defined in the milestones block). */
const OMEN_STEP = 10000;
const omenSolved = i => (typeof REG_CURRENT !== 'undefined') && REG_CURRENT >= (i + 1) * OMEN_STEP;

/* master–detail stage (Endfield-style): list on the left, decoded detail on the right */
let omenDecodeRAF = 0, omenActive = -1;

function buildOmens(){
  const list = document.getElementById('omen-list');
  if(!list) return;
  list.innerHTML = OMENS.map((o,i)=>`
    <li><button class="omen-item ${omenSolved(i)?'solved':'sealed'}" data-oi="${i}" type="button">
      <span class="oi-n">${esc(o.n)}</span>
      <span class="oi-era">${esc(o.era)}</span>
      <span class="oi-at">${((i+1)*OMEN_STEP).toLocaleString()}</span>
      <span class="oi-dot" aria-hidden="true"></span>
    </button></li>`).join('');
  list.addEventListener('click', e=>{
    const btn = e.target.closest('.omen-item');
    if(!btn) return;
    const i = +btn.dataset.oi;
    if(i !== omenActive){ selectOmen(i); if(window.silicaBlip) window.silicaBlip(); }
  });
  const solved = OMENS.filter((_,i)=>omenSolved(i)).length;
  const el = document.getElementById('omen-solved'); if(el) el.textContent = solved;
  // next 象 threshold
  const next = OMENS.findIndex((_,i)=>!omenSolved(i));
  const nx = document.getElementById('omen-next');
  if(nx) nx.textContent = next < 0 ? '五象全解封' : `距${OMENS[next].n} ${((next+1)*OMEN_STEP - REG_CURRENT).toLocaleString()} 人`;
  const firstSolved = OMENS.findIndex((_,i)=>omenSolved(i));
  selectOmen(firstSolved >= 0 ? firstSolved : 0);
}

function selectOmen(i){
  if(i === omenActive) return;
  omenActive = i;
  const o = OMENS[i], s = omenSolved(i);
  document.querySelectorAll('.omen-item').forEach((b,bi)=> b.classList.toggle('active', bi===i));
  const stage = document.getElementById('omen-stage');
  if(!stage) return;
  const song = o.song.map(l=>`<span>${s?esc(l):omenRedact(l)}</span>`).join('');
  stage.classList.remove('in');
  stage.innerHTML = `
    <div class="stage-frame"></div>
    <div class="stage-idx">${esc(o.n)} · ${esc(o.era)} · ${s?'已解 REVEALED':'封印 SEALED'}</div>
    <div class="stage-chan ${s?'':'sealed'}">${s?esc(o.chan):omenRedact(o.chan)}</div>
    <div class="stage-song">${song}</div>
    <div class="stage-div"><span>${s?'解讀 · DECODE':'封印 · LOCKED'}</span></div>
    <p class="stage-plain ${s?'':'sealed'}" id="stage-plain"></p>`;
  requestAnimationFrame(()=> requestAnimationFrame(()=> stage.classList.add('in')));
  const plainEl = document.getElementById('stage-plain');
  cancelAnimationFrame(omenDecodeRAF);
  if(s) decodeText(plainEl, o.plain, 950);
  else plainEl.textContent = '此象尚未解封。集齊殘象，白話自會浮現。';
}

/* decrypt-reveal: scramble → resolve left-to-right (訊號解密母題) */
function decodeText(el, text, dur){
  const chars = [...text], glyphs = '▓▚▞▛▜░網訊靜零魂';
  let start = null;
  function frame(t){
    if(start == null) start = t;
    const p = Math.min((t-start)/dur, 1);
    const reveal = Math.floor(p * chars.length);
    el.textContent = chars.map((c,idx)=>{
      if(idx < reveal) return c;
      if(/[\s、，。；！？「」]/.test(c)) return c;
      return glyphs[(idx*7 + (t|0)) % glyphs.length];
    }).join('');
    if(p < 1) omenDecodeRAF = requestAnimationFrame(frame);
    else el.textContent = text;
  }
  omenDecodeRAF = requestAnimationFrame(frame);
}

/* ---------- system showcase video ---------- */
function initSysVideo(){
  const wrap = document.getElementById('sys-video');
  if(!wrap) return;
  const vid = wrap.querySelector('.sys-vid');
  wrap.addEventListener('click', ()=>{
    if(vid.paused){ vid.play().then(()=>wrap.classList.add('playing')).catch(()=>{}); }
    else { vid.pause(); wrap.classList.remove('playing'); }
  });
  vid.addEventListener('ended', ()=> wrap.classList.remove('playing'));
}

/* ---------- lightbox (unit lore + atlas images) ---------- */
function esc(s){ return String(s).replace(/[&<>]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c])); }

/* 靛煙 — 香門首座 · 渡靈師 NPC (not a 矽魂; no HOST). Rendered via unitCaption too. */
const YIN_LORE = {
  file:'char-yin', code:'PSYCHOPOMP // 香門首座', name:'靛煙',
  role:'渡靈師 · 香門首座', rarityLabel:'NPC',
  quote:'「香會斷，人也會斷。我教你們的第一件事，是怎麼回頭。」',
  story:[
    '藍衫、藝妓的白粉、一領毛裘——三種來歷縫在她一身。有人問那是什麼講究，她只說：不是衣裳，是名冊。一座島的亡魂，都縫進了同一具載體。',
    '她吐一口煙，煙就認得路。門下都學她的扇、她的香，卻學不來她從不牽自己那一縷。問急了，她把煙斗在案上磕了磕：香門的規矩，先渡別人。',
    '大靜默之後，落靈重新靈驗，她把散落的渡靈師一個個收進香門。你若問她怕不怕自己走太深，她笑而不語，續上一口煙——彷彿那口煙裡，正燒著她不肯說的那一段。' ],
  notes:'嗜苦。晨起先含一枚醃梅，說是壓住舌根的甜——甜會讓人想留下。煙斗從不離手，斗缽刻著看不清的字。門下說夜裡見過她對著空扇說話，扇一合，就再不提。至於對誰說，沒人敢問第二次。',
  bonds:[
    { with:'調律者', rel:'她要你的手替她探那些煙到不了的深處；你調的律，是她香路上唯一不會斷的燈。她信你，卻不肯說信到哪一步。' },
    { with:'香門', rel:'門下敬她如母，她卻只認自己是「先走一步的人」。香火要不斷，得有人肯先燒盡自己——這話她從不明說，只在收徒那天多點一炷。' } ],
  hook:'她收進一身的亡魂裡，究竟有沒有一縷，是她自己不敢渡的人？' };

/* 香門門下 — 三位渡靈師 (NPC). Clickable via .rite-member cards. */
const RITE_MEMBERS = [
  { file:'char-beijiu', code:'ACOLYTE // 香門門下', name:'焙九', role:'渡靈師 · 見習 · 理香', rarityLabel:'NPC',
    story:[
      '十六歲，香門裡最小的一個。管的是理香、續火——別人落陰時，他守著那炷不能滅的信號香，一滅，路上的人就找不到回頭的煙。',
      '你問他為什麼進香門，他低頭撥了撥火，說：「這裡的香，比外頭的暖。」再問下去，他就假裝火要滅了，忙著去添——添的其實是一炷早就旺著的香。' ],
    notes:'怕黑，卻選了整天待在最暗的香室。愛吃鍋巴，說焦香壓得住陰氣的味道。記性極好，門下每個人的香方他都背得出，唯獨背不出——或不肯背——自己是被誰從哪撿回來的。問起，他就數起別人的香方，一路數到你忘了問。',
    hook:'「焙九」是門裡給的名，他原本的名字，燒在哪一炷香裡？' },

  { file:'char-lvsheng', code:'CARTOGRAPHER // 香門門下', name:'縷生', role:'渡靈師 · 香路測繪', rarityLabel:'NPC',
    story:[
      '香門的路是他一步步量出來的。哪一層的香會偏、哪一道岔通向走不回的底，都記在他那捲越畫越長的圖上。他走得比誰都深，也是唯一從「第九層」上來還沒斷的人。',
      '有人求他講第九層底下是什麼樣。他把圖一捲，指腹壓住眉心那點靛，說：「圖上沒畫的地方，就別問了。」——沒畫，是因為畫不出，還是不敢畫，他自己也繞開不答。' ],
    notes:'不喝熱的，說走過深處的人，舌頭記不住溫度了。習慣自言自語報數，門下循著他的數聲就知道他在哪一層。畫圖時右手會不受控地抖，他說是老毛病；只有靛煙知道那是哪一夜落下的。至於那一夜，兩人都用一口煙帶過。',
    hook:'他圖上留白的第九層，藏著香門不肯宣的哪一條底？' },

  { file:'char-chenbi', code:'GATEKEEPER // 香門門下', name:'秤兒', role:'渡靈師 · 守門 · 接引', rarityLabel:'NPC',
    story:[
      '她不下深處，只守在香路的最上一層，手裡攥著那條繩。落陰的人走得再遠，繩的這頭都是她。鈴一亂，她就知道誰在底下慌了，該往回拽了。',
      '門下都活著回來，靠的是她這雙手。可你若問她這些年可曾拽空過一次，她低頭去理那串鈴，理得極慢極仔細，直到你聽懂那沉默——有一個名字，繩子那頭，再沒回應過。' ],
    notes:'嗜甜，兜裡永遠揣著麥芽糖，說給剛上來、魂還虛的人含一顆定神。一雙小手，繭卻厚得掐不動——那不是這具「器」的年歲，是繩那頭幾十年，一寸寸磨進「魂」裡的；她握出來的繭，比她整個人還老。夜裡不點燈，摸黑數那串鈴，一顆一顆，數到某一顆會停很久。門下都裝作沒看見她停在哪一顆。',
    hook:'繩子那頭再沒回應的那個名字，是不是香門立「守門」一職的起因？' },
];

function unitCaption(u){
  const rar = u.rarityLabel || (u.locked ? 'CLASSIFIED' : (u.rarity>=6 ? 'SSR' : 'SR'));
  const story = (u.story||[]).map(p=>`<p>${esc(p)}</p>`).join('');
  const bonds = (u.bonds||[]).map(b=>
    `<li><b>${esc(b.with)}</b><span>${esc(b.rel)}</span></li>`).join('');
  return `
    <div class="lb-code">${esc(u.code)}</div>
    <h3 class="lb-name">${esc(u.name)}<span class="lb-rarity">${rar}</span></h3>
    <div class="lb-role">${esc(u.role)}</div>
    ${u.quote?`<blockquote class="lb-quote">${esc(u.quote)}</blockquote>`:''}
    <div class="lb-scroll">
      ${u.host?`<section class="lb-sect"><span class="lb-label">宿主殘志 · HOST</span><p>${esc(u.host)}</p></section>`:''}
      ${story?`<section class="lb-sect"><span class="lb-label">封存檔 · DOSSIER</span>${story}</section>`:''}
      ${u.notes?`<section class="lb-sect"><span class="lb-label">側寫 · INTEL</span><p>${esc(u.notes)}</p></section>`:''}
      ${bonds?`<section class="lb-sect"><span class="lb-label">羈絆 · BONDS</span><ul class="lb-bonds">${bonds}</ul></section>`:''}
      ${u.hook?`<p class="lb-hook">${esc(u.hook)}</p>`:''}
    </div>`;
}

function initLightbox(){
  const lb = document.getElementById('lightbox');
  if(!lb) return;
  const img = lb.querySelector('.lb-img');
  const cap = lb.querySelector('.lb-cap');

  function open(card){
    const im = card.querySelector('img');
    const src = im && im.getAttribute('src');
    if(!src) return;                       // skip failed/placeholder images
    img.src = src; img.alt = im.alt || '';
    const idx = card.dataset.ui;
    const isAtlas = card.classList.contains('atlas-card');
    lb.classList.remove('lb-omen');
    lb.classList.toggle('lb-map', isAtlas);          // full-panel mode for region maps
    lb.classList.toggle('lb-char', !isAtlas);        // character mode (mobile: full-bleed art + bottom sheet)
    if(card.classList.contains('unit-card') && idx != null && UNITS[+idx]){
      const u = UNITS[+idx];
      cap.innerHTML = unitCaption(u);
      lb.classList.toggle('lb-locked', !!u.locked);
    } else if(card.dataset.rm != null && RITE_MEMBERS[+card.dataset.rm]){
      cap.innerHTML = unitCaption(RITE_MEMBERS[+card.dataset.rm]);
      lb.classList.remove('lb-locked');
    } else if(card.classList.contains('rite-portrait')){
      cap.innerHTML = unitCaption(YIN_LORE);
      lb.classList.remove('lb-locked');
    } else {
      const g = s => (card.querySelector(s)||{}).textContent || '';
      cap.innerHTML =
        `<div class="lb-code">${esc(g('.atlas-code,.unit-code'))}</div>`+
        `<h3 class="lb-name">${esc(g('.atlas-name,.unit-name'))}</h3>`+
        `<div class="lb-desc">${esc(g('.atlas-desc,.unit-tagline'))}</div>`;
      lb.classList.remove('lb-locked');
    }
    lb.hidden = false;
    requestAnimationFrame(()=> lb.classList.add('open'));
    document.body.style.overflow = 'hidden';
  }
  function close(){
    lb.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(()=>{ lb.hidden = true; img.src = ''; }, 320);
  }

  document.addEventListener('click', e=>{
    const card = e.target.closest('.unit-card, .atlas-card, .rite-portrait, .rite-member');
    if(card){ open(card); return; }
  });
  lb.addEventListener('click', e=>{ if(e.target === lb || e.target.closest('.lb-close')) close(); });
  addEventListener('keydown', e=>{ if(e.key === 'Escape' && !lb.hidden) close(); });
}

/* boot */
buildUnitCards();
tagReveal();
initThree();
initReveal();
initHeader();
initMobileNav();
initLightbox();
buildOmens();
buildMilestones();
initSysVideo();
runLoader();
