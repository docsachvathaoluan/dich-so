// ───────────────────────────────────────────────────────────────────────────
// Minh triết Lão Tử – Trang Tử (Đạo gia) đối chiếu với Kinh Dịch.
//
// TINH THẦN: trình bày Lão–Trang là DÒNG MINH TRIẾT ĐẠO GIA CỘNG HƯỞNG với Dịch
// (cùng worldview âm–dương / biến dịch / phản phục / vô vi), CÓ ghi chú trung thực:
// Dịch vốn thuộc Nho điển; sự "đạo gia hoá" Dịch đến qua Thập Dực & chú giải Vương
// Bật → hợp lưu VỀ SAU, không cùng một gốc.
//
// TRUNG THỰC:
//  • `han` = nguyên văn Hán — phần KIỂM ĐƯỢC (đối chiếu ctext.org / Wikisource).
//  • `viet` = BẢN DỊCH NGHĨA của dự án, đối chiếu Nguyễn Hiến Lê / Thu Giang Nguyễn
//    Duy Cần (diễn giải, không phải định lý).
//  • `vietEn` = bản dịch tiếng Anh (theo lối scholarly: Legge/Watson public domain,
//    diễn đạt lại bằng giọng dự án).
//  • Chỉ trích CÂU NGẮN + dẫn nguồn (chương/thiên), không chép cả đoạn dịch.
// ───────────────────────────────────────────────────────────────────────────

export type WisdomSource = 'laozi' | 'zhuangzi';

export interface WisdomQuote {
  id: string;
  source: WisdomSource;
  /** Nhãn nguồn hiển thị, vd "Đạo Đức Kinh — chương 42". */
  ref: string;
  /** EN: "Daodejing — ch. 42" / "Zhuangzi — 'Discussion on Making All Things Equal'". */
  refEn: string;
  /** Mã chương/thiên để fact-check (ĐĐK: số chương; Trang Tử: tên thiên). */
  cite: string;
  /** Nguyên văn Hán (phần kiểm được). */
  han: string;
  /** Bản dịch nghĩa tiếng Việt (diễn giải — chờ đối chiếu). */
  viet: string;
  /** Bản dịch tiếng Anh (scholarly — chờ đối chiếu). */
  vietEn: string;
  /** Vì sao câu này cộng hưởng với khuôn mẫu Dịch. */
  resonance: string;
  /** EN. */
  resonanceEn: string;
}

export interface WisdomAnchor {
  /** Khoá khái niệm/khuôn mẫu (callout theo concept). */
  concept: string;
  /** Nhãn ngắn của điểm neo (hiện trên thẻ). */
  label: string;
  /** EN. */
  labelEn: string;
  /** Nếu neo vào một quẻ cụ thể: số Văn Vương 1..64. */
  hexKingWen?: number;
  /** Danh sách id quote. */
  quoteIds: string[];
}

// ── Câu trích ──────────────────────────────────────────────────────────────
// Nguồn Hán: Đạo Đức Kinh (道德經) & Trang Tử (莊子) — ưu tiên 7 Nội thiên.
// Đối chiếu: ctext.org/dao-de-jing, ctext.org/zhuangzi, Wikisource 道德經/莊子.

export const QUOTES: WisdomQuote[] = [
  // ―― Lão Tử: Đạo ――
  {
    id: 'dao-kha-dao',
    source: 'laozi',
    ref: 'Đạo Đức Kinh — chương 1',
    refEn: 'Daodejing — ch. 1',
    cite: 'ĐĐK 1',
    han: '道可道，非常道。名可名，非常名。',
    viet: 'Đạo mà nói ra được thì không phải Đạo thường hằng; tên mà gọi ra được thì không phải tên thường hằng.',
    vietEn: 'The Dao that can be spoken is not the eternal Dao; the name that can be named is not the eternal name.',
    resonance:
      'Đạo là cái gốc chưa phân, vượt khỏi ngôn từ — tương ứng Thái Cực (太極) trước khi tách Âm–Dương: trạng thái “1” hợp nhất, chưa thành bit 0/1.',
    resonanceEn:
      'The Dao is the undivided root, beyond words — answering to Taiji (太極) before it splits into Yin and Yang: the unified "1" state, not yet a 0/1 bit.',
  },
  {
    id: 'dao-sinh-nhat',
    source: 'laozi',
    ref: 'Đạo Đức Kinh — chương 42',
    refEn: 'Daodejing — ch. 42',
    cite: 'ĐĐK 42',
    han: '道生一，一生二，二生三，三生萬物。萬物負陰而抱陽，沖氣以為和。',
    viet: 'Đạo sinh Một, Một sinh Hai, Hai sinh Ba, Ba sinh vạn vật. Vạn vật cõng Âm mà ôm Dương, khí xung hoà mà thành.',
    vietEn: 'The Dao gives birth to One, One to Two, Two to Three, and Three to the myriad things. All things carry Yin and embrace Yang; the surging of their breath makes harmony.',
    resonance:
      'Cùng một cơ chế “nhân đôi” của Dịch: Thái Cực → Lưỡng Nghi → Tứ Tượng → Bát Quái → 64. “Cõng Âm ôm Dương” chính là mỗi hào = một bit Âm(0)/Dương(1).',
    resonanceEn:
      'The very doubling engine of the Changes: Taiji → Two Modes → Four Images → Eight Trigrams → 64. "Carrying Yin, embracing Yang" is exactly each line = one Yin(0)/Yang(1) bit.',
  },
  // ―― Lão Tử: phản phục / quy căn ――
  {
    id: 'phan-gia-dao-dong',
    source: 'laozi',
    ref: 'Đạo Đức Kinh — chương 40',
    refEn: 'Daodejing — ch. 40',
    cite: 'ĐĐK 40',
    han: '反者道之動，弱者道之用。天下萬物生於有，有生於無。',
    viet: 'Quay trở lại là cái động của Đạo; mềm yếu là cái dụng của Đạo. Vạn vật sinh từ “có”, “có” sinh từ “không”.',
    vietEn: 'Returning is the movement of the Dao; yielding is its function. The world\'s myriad things are born from Being, and Being from Non-being.',
    resonance:
      'Quy luật phản phục: cực thịnh thì quay đầu. Đúng nhịp tiêu–tức của 12 Tích quái và quẻ Phục (復) — dương trở lại sau khi bị bóc hết.',
    resonanceEn:
      'The law of return: at the peak, things turn back. Exactly the waxing–waning rhythm of the 12 sovereign hexagrams and the hexagram Return (復) — yang comes back after being stripped away.',
  },
  {
    id: 'quan-phuc-quy-can',
    source: 'laozi',
    ref: 'Đạo Đức Kinh — chương 16',
    refEn: 'Daodejing — ch. 16',
    cite: 'ĐĐK 16',
    han: '萬物並作，吾以觀復。夫物芸芸，各復歸其根。歸根曰靜。',
    viet: 'Vạn vật cùng sinh sôi, ta nhân đó mà xem lẽ “trở về”. Muôn vật rậm rạp, rồi mỗi vật trở về cội gốc. Về cội gốc gọi là tĩnh.',
    vietEn: 'The myriad things arise together, and by this I watch their return. However luxuriantly they grow, each returns to its root. Returning to the root is called stillness.',
    resonance:
      'Chữ “復” (phục/trở về) là tên quẻ Phục. Vòng tuần hoàn về gốc khớp với chu kỳ Đông chí một dương sinh ở đáy quẻ.',
    resonanceEn:
      'The word "復" (return) is the name of the hexagram Return. The cycle back to the root matches the Winter-Solstice moment when a single yang is born at the base of the hexagram.',
  },
  // ―― Lão Tử: nhu thắng cương / nước ――
  {
    id: 'thuong-thien-nhuoc-thuy',
    source: 'laozi',
    ref: 'Đạo Đức Kinh — chương 8',
    refEn: 'Daodejing — ch. 8',
    cite: 'ĐĐK 8',
    han: '上善若水。水善利萬物而不爭，處眾人之所惡，故幾於道。',
    viet: 'Bậc thiện cao nhất giống như nước. Nước khéo làm lợi cho vạn vật mà không tranh, ở chỗ mọi người ghét, nên gần với Đạo.',
    vietEn: 'The highest good is like water. Water benefits all things and does not contend, dwelling in the places all people disdain — so it is close to the Dao.',
    resonance:
      'Tượng Nước = quẻ Khảm (☵). Đức “lợi vật mà không tranh” soi sáng tinh thần khiêm hạ của quẻ Khiêm (謙) và quẻ Khôn (坤).',
    resonanceEn:
      'The image of Water = the trigram Kan (☵). The virtue of "benefiting without contending" lights up the humble spirit of the hexagrams Modesty (謙) and Earth (坤).',
  },
  {
    id: 'nhu-nhuoc-thang',
    source: 'laozi',
    ref: 'Đạo Đức Kinh — chương 78',
    refEn: 'Daodejing — ch. 78',
    cite: 'ĐĐK 78',
    han: '天下莫柔弱於水，而攻堅強者莫之能勝，以其無以易之。',
    viet: 'Trong thiên hạ không gì mềm yếu hơn nước, mà công phá cái cứng mạnh thì không gì thắng được nó, vì không gì thay được nó.',
    vietEn: 'Nothing in the world is softer than water, yet for attacking the hard and strong nothing surpasses it, for nothing can take its place.',
    resonance:
      'Nghịch lý “mềm thắng cứng” — Âm nhu có sức bền riêng. Đối trọng với khí Dương cương của quẻ Càn, nhắc bài học “vật cực tất phản”.',
    resonanceEn:
      'The paradox of "soft overcoming hard" — the yielding Yin has its own endurance. A counterweight to the firm Yang energy of Heaven (Qian), recalling the lesson "the extreme reverses."',
  },
  // ―― Lão Tử: vật cực tất phản / biết dừng ――
  {
    id: 'tri-doanh-bat-nhu',
    source: 'laozi',
    ref: 'Đạo Đức Kinh — chương 9',
    refEn: 'Daodejing — ch. 9',
    cite: 'ĐĐK 9',
    han: '持而盈之，不如其已；揣而銳之，不可長保。',
    viet: 'Giữ cho thật đầy, chẳng bằng dừng lại; mài cho thật bén, không giữ được lâu.',
    vietEn: 'To hold a vessel filled to the brim is not as good as stopping in time; sharpen a blade to its keenest and it will not stay sharp for long.',
    resonance:
      'Đầy thì tràn, bén thì mẻ — chính là “kháng long hữu hối” (rồng bay quá cao thì hối) ở hào 6 quẻ Càn: cực thịnh ẩn mầm suy.',
    resonanceEn:
      'Full, it overflows; sharp, it chips — exactly "the arrogant dragon will have cause to repent" at line 6 of Qian: at the peak of flourishing hides the seed of decline.',
  },
  // ―― Lão Tử: vô vi ――
  {
    id: 'vo-vi-nhi-vo-bat-vi',
    source: 'laozi',
    ref: 'Đạo Đức Kinh — chương 37',
    refEn: 'Daodejing — ch. 37',
    cite: 'ĐĐK 37',
    han: '道常無為而無不為。',
    viet: 'Đạo thường không làm (vô vi) mà không gì không làm.',
    vietEn: 'The Dao abides in non-action (wu wei), yet leaves nothing undone.',
    resonance:
      '“Vô vi” không phải thụ động, mà là thuận theo lẽ vận hành. Tinh thần này là nền của việc xem Dịch để HIỂU QUY LUẬT — không phải để cưỡng cầu bói toán.',
    resonanceEn:
      '"Wu wei" is not passivity but moving with the way things work. This spirit underlies reading the Changes to UNDERSTAND THE LAW — not to force fortunes through divination.',
  },
  {
    id: 'bat-tranh',
    source: 'laozi',
    ref: 'Đạo Đức Kinh — chương 22',
    refEn: 'Daodejing — ch. 22',
    cite: 'ĐĐK 22',
    han: '夫唯不爭，故天下莫能與之爭。',
    viet: 'Chính vì không tranh, nên thiên hạ không ai tranh nổi với mình.',
    vietEn: 'Precisely because he does not contend, no one in the world can contend with him.',
    resonance:
      'Đức khiêm nhường tới cùng — cộng hưởng quẻ Khiêm (謙), quẻ duy nhất cả sáu hào đều tốt theo truyền thống.',
    resonanceEn:
      'Humility carried to the end — resonating with Modesty (謙), traditionally the one hexagram all six of whose lines are auspicious.',
  },
  // ―― Trang Tử: tề vật / vật hoá ――
  {
    id: 'thien-dia-tinh-sinh',
    source: 'zhuangzi',
    ref: 'Trang Tử — Tề Vật Luận',
    refEn: "Zhuangzi — 'Discussion on Making All Things Equal'",
    cite: 'Trang Tử · Tề Vật Luận (齊物論)',
    han: '天地與我並生，而萬物與我為一。',
    viet: 'Trời đất cùng sinh với ta, mà vạn vật với ta là một.',
    vietEn: 'Heaven and Earth were born together with me, and the myriad things and I are one.',
    resonance:
      'Cái nhìn hợp nhất, xoá ranh giới chủ–khách. Ứng với gốc Thái Cực và mạng lưới quan hệ nối mọi quẻ thành một thể.',
    resonanceEn:
      'A unifying view that erases the self–object boundary. It answers to the Taiji root and to the web of relations that binds all hexagrams into one body.',
  },
  {
    id: 'bi-xuat-o-thi',
    source: 'zhuangzi',
    ref: 'Trang Tử — Tề Vật Luận',
    refEn: "Zhuangzi — 'Discussion on Making All Things Equal'",
    cite: 'Trang Tử · Tề Vật Luận (齊物論)',
    han: '彼出於是，是亦因彼。',
    viet: '“Kia” sinh ra từ “này”, “này” cũng nương vào “kia”.',
    vietEn: '"That" arises from "this," and "this" also depends on "that."',
    resonance:
      'Cái này–cái kia nương nhau mà có — đúng tinh thần quan hệ ĐỐI/ĐẢO: mỗi quẻ chỉ có nghĩa trong tương quan với quẻ bù/lật của nó.',
    resonanceEn:
      'This and that arise in mutual dependence — the very spirit of the Opposite/Reversed relations: each hexagram means something only in relation to its complement/inverse.',
  },
  {
    id: 'mong-ho-diep',
    source: 'zhuangzi',
    ref: 'Trang Tử — Tề Vật Luận',
    refEn: "Zhuangzi — 'Discussion on Making All Things Equal'",
    cite: 'Trang Tử · Tề Vật Luận (齊物論)',
    han: '昔者莊周夢為胡蝶……不知周之夢為胡蝶與，胡蝶之夢為周與？……此之謂物化。',
    viet: 'Xưa Trang Chu mộng thấy mình hoá bướm… Chẳng biết Chu mộng thành bướm, hay bướm mộng thành Chu? … Ấy gọi là “vật hoá”.',
    vietEn: 'Once Zhuang Zhou dreamed he was a butterfly… He did not know whether Zhou had dreamed he was a butterfly, or a butterfly was dreaming it was Zhou… This is called the transformation of things.',
    resonance:
      '“Vật hoá” — sự chuyển hoá giữa các trạng thái, ranh giới chỉ là tương đối. Soi sáng tính BIẾN của quẻ: một hào động là cả quẻ chuyển sang quẻ khác.',
    resonanceEn:
      'The "transformation of things" — states shift into one another, boundaries are only relative. It lights up the CHANGE in the Changes: one moving line turns a whole hexagram into another.',
  },
  // ―― Trang Tử: vô vi / thuận tự nhiên ――
  {
    id: 'bao-dinh-giai-nguu',
    source: 'zhuangzi',
    ref: 'Trang Tử — Dưỡng Sinh Chủ',
    refEn: "Zhuangzi — 'The Secret of Caring for Life'",
    cite: 'Trang Tử · Dưỡng Sinh Chủ (養生主)',
    han: '依乎天理……以無厚入有間，恢恢乎其於遊刃必有餘地矣。',
    viet: 'Nương theo lẽ tự nhiên… lấy cái “không dày” lách vào chỗ “có khe”, thênh thang nên đưa dao vẫn còn dư chỗ.',
    vietEn: 'Following the natural grain… he slides what has no thickness into the spaces that have gaps — so roomy that there is always ample room to ply the blade.',
    resonance:
      'Bào Đinh mổ trâu thuận thớ — hình ảnh sống động của VÔ VI: hành động thuận quy luật thì nhẹ nhàng. Cùng tinh thần “hiểu quy luật” của việc đọc Dịch.',
    resonanceEn:
      'Cook Ding carving the ox along the grain — a vivid image of WU WEI: action that follows the law is effortless. The same spirit of "understanding the law" as reading the Changes.',
  },

  // ════ Bộ câu cho 12 Tích quái (đối chiếu theo pha tiêu–tức) ════
  // ―― Lâm (19) — 2 dương, dương khí chớm lớn ――
  {
    id: 'hop-bao-chi-moc',
    source: 'laozi',
    ref: 'Đạo Đức Kinh — chương 64',
    refEn: 'Daodejing — ch. 64',
    cite: 'ĐĐK 64',
    han: '合抱之木，生於毫末；九層之臺，起於累土。',
    viet: 'Cây ôm cả vòng tay mọc từ mầm bé tí; đài chín tầng dựng từ những sọt đất chồng lên.',
    vietEn: 'A tree you can barely embrace grows from a tiny sprout; a nine-storey terrace rises from a heap of piled earth.',
    resonance:
      'Hai hào dương ở quẻ Lâm là cái mầm vừa lớn. Đạo gia nhắc: việc lớn khởi từ cái nhỏ — dương khí cứ tích dần như đất chồng thành đài.',
    resonanceEn:
      'The two yang lines in Approach (Lin) are the sprout just growing. Daoism reminds us: great things begin from the small — yang energy accumulates like earth piled into a terrace.',
  },
  {
    id: 'thien-ly-chi-hanh',
    source: 'laozi',
    ref: 'Đạo Đức Kinh — chương 64',
    refEn: 'Daodejing — ch. 64',
    cite: 'ĐĐK 64',
    han: '千里之行，始於足下。',
    viet: 'Đi ngàn dặm bắt đầu từ một bước chân.',
    vietEn: 'A journey of a thousand miles begins beneath one\'s feet.',
    resonance:
      'Quẻ Lâm đang trên đà tiến (Lâm = tới gần). Mọi hành trình lớn của dương khí trong năm khởi từ bước nhỏ ở Đông chí.',
    resonanceEn:
      'Approach (Lin, "drawing near") is on the rise. Every great journey of yang energy through the year begins with the small step at the Winter Solstice.',
  },
  // ―― Thái (11) — 3 dương, trời đất giao hoà ――
  {
    id: 'hoa-thai',
    source: 'laozi',
    ref: 'Đạo Đức Kinh — chương 42',
    refEn: 'Daodejing — ch. 42',
    cite: 'ĐĐK 42',
    han: '萬物負陰而抱陽，沖氣以為和。',
    viet: 'Vạn vật cõng Âm mà ôm Dương, khí xung hoà mà thành.',
    vietEn: 'All things carry Yin and embrace Yang; the surging of their breath makes harmony.',
    resonance:
      'Quẻ Thái = trời đất giao, ba dương ba âm cân bằng. Đúng cảnh “xung khí vi hoà” của Lão Tử: Âm–Dương hoà thì vạn vật thông.',
    resonanceEn:
      'Peace (Tai) = Heaven and Earth meeting, three yang and three yin in balance. Exactly Laozi\'s "the surging breath makes harmony": when Yin and Yang blend, all things flow.',
  },
  {
    id: 'hoa-phuc-thai',
    source: 'laozi',
    ref: 'Đạo Đức Kinh — chương 58',
    refEn: 'Daodejing — ch. 58',
    cite: 'ĐĐK 58',
    han: '禍兮福之所倚，福兮禍之所伏。',
    viet: 'Hoạ là chỗ phúc tựa vào, phúc là chỗ hoạ nấp sau.',
    vietEn: 'Misfortune is what fortune leans upon; fortune is where misfortune lies hidden.',
    resonance:
      'Thái cực thịnh (thông) lại ẩn mầm Bĩ (tắc) — ngay sau Thái là Đại Tráng rồi suy. Phúc cực thì hoạ rình: giữ cảnh thái hoà bằng sự chừng mực.',
    resonanceEn:
      'Peace at its height (free flow) already hides the seed of Standstill (blockage) — right after Tai comes Great Power, then decline. Fortune at its peak invites misfortune: keep the harmony through moderation.',
  },
  // ―― Đại Tráng (34) — 4 dương, thế mạnh ――
  {
    id: 'vat-trang-tac-lao',
    source: 'laozi',
    ref: 'Đạo Đức Kinh — chương 55',
    refEn: 'Daodejing — ch. 55',
    cite: 'ĐĐK 55',
    han: '物壯則老，謂之不道，不道早已。',
    viet: 'Vật cường tráng thì chóng già; thế là trái Đạo, trái Đạo thì sớm dứt.',
    vietEn: 'When things reach their prime they grow old; this is called being against the Dao, and what is against the Dao soon ends.',
    resonance:
      'Quẻ Đại Tráng (大壯 = rất mạnh) bốn hào dương — nhưng Lão Tử cảnh báo: mạnh đến cực thì bắt đầu suy. Sức mạnh không tự kiềm là mầm của tàn lụi.',
    resonanceEn:
      'Great Power (大壯 "great strength"), four yang lines — but Laozi warns: strength at its extreme begins to decline. Power that does not restrain itself is the seed of ruin.',
  },
  {
    id: 'qua-nhi-vat-cuong',
    source: 'laozi',
    ref: 'Đạo Đức Kinh — chương 30',
    refEn: 'Daodejing — ch. 30',
    cite: 'ĐĐK 30',
    han: '果而勿強。',
    viet: 'Đạt được việc rồi thì thôi, chớ cậy mạnh.',
    vietEn: 'Achieve your result and stop there; do not rely on force.',
    resonance:
      'Đang lúc “đại tráng”, dễ ỷ thế lấn tới. Đạo gia khuyên: nên việc thì dừng, đừng dùng sức cường — hợp lời Đại Tượng “phi lễ phất lý”.',
    resonanceEn:
      'In the time of "great power" it is easy to press on relying on strength. Daoism advises: once the work is done, stop; do not use brute force — matching the Image\'s "the superior man treads no path contrary to propriety."',
  },
  // ―― Quải (43) — 5 dương, quyết (dứt khoát) ――
  {
    id: 'vi-chi-o-vi-huu',
    source: 'laozi',
    ref: 'Đạo Đức Kinh — chương 64',
    refEn: 'Daodejing — ch. 64',
    cite: 'ĐĐK 64',
    han: '為之於未有，治之於未亂。',
    viet: 'Làm khi việc chưa thành hình, trị khi chưa loạn.',
    vietEn: 'Act on it while it has not yet come to be; put it in order before it falls into disorder.',
    resonance:
      'Quẻ Quải (夬 = quyết) năm dương dồn quyết một âm cuối. Lão Tử: ra tay đúng lúc, khi mầm hoạ còn nhỏ — quyết mà sáng, không để tới loạn.',
    resonanceEn:
      'Break-through (夬 "resolution"), five yang resolving to remove the last yin. Laozi: act at the right moment, while the seed of trouble is still small — resolute yet clear-sighted, before disorder sets in.',
  },
  {
    id: 'khuc-tac-toan',
    source: 'laozi',
    ref: 'Đạo Đức Kinh — chương 22',
    refEn: 'Daodejing — ch. 22',
    cite: 'ĐĐK 22',
    han: '曲則全，枉則直。',
    viet: 'Cong thì vẹn, queo thì thẳng.',
    vietEn: 'Bent, then whole; crooked, then straight.',
    resonance:
      'Lúc thế dương áp đảo (Quải), Đạo gia nhắc nẻo mềm: chịu cong một chút lại bảo toàn — quyết nhưng không cứng nhắc.',
    resonanceEn:
      'When yang overwhelms (Break-through), Daoism recalls the yielding way: bending a little keeps you whole — resolute, yet not rigid.',
  },
  // ―― Càn (1) — 6 dương, đỉnh điểm ――
  {
    id: 'phu-quy-nhi-kieu',
    source: 'laozi',
    ref: 'Đạo Đức Kinh — chương 9',
    refEn: 'Daodejing — ch. 9',
    cite: 'ĐĐK 9',
    han: '富貴而驕，自遺其咎。',
    viet: 'Giàu sang mà kiêu, tự chuốc lấy tai vạ.',
    vietEn: 'To be rich and honored yet arrogant is to bring calamity upon oneself.',
    resonance:
      'Càn sáu hào dương — cực thịnh, ứng “kháng long hữu hối”. Lão Tử cùng ý: ở đỉnh mà kiêu thì tự rước hoạ; biết khiêm mới giữ được.',
    resonanceEn:
      'Qian, six yang lines — the utmost flourishing, answering "the arrogant dragon will have cause to repent." Laozi agrees: at the peak, arrogance invites disaster; only humility preserves.',
  },
  // ―― Cấu (44) — 1 âm vừa sinh (Hạ chí) ――
  {
    id: 'ky-an-di-tri',
    source: 'laozi',
    ref: 'Đạo Đức Kinh — chương 64',
    refEn: 'Daodejing — ch. 64',
    cite: 'ĐĐK 64',
    han: '其安易持，其未兆易謀；其脆易泮，其微易散。',
    viet: 'Lúc yên dễ giữ, chưa hiện điềm thì dễ tính; còn giòn dễ tan, còn nhỏ dễ rã.',
    vietEn: 'What is at rest is easy to hold; what shows no sign yet is easy to plan for; what is brittle is easy to shatter; what is minute is easy to scatter.',
    resonance:
      'Cấu = một hào âm vừa sinh dưới năm dương — mầm suy còn rất nhỏ giữa lúc cực thịnh. Lão Tử: nhận ra cái “chưa hiện” mà liệu sớm.',
    resonanceEn:
      'Coming to Meet (Gou) = a single yin just born beneath five yang — the seed of decline, still tiny at the peak of flourishing. Laozi: perceive "what has not yet shown" and prepare early.',
  },
  {
    id: 'cau-ngo-vi-am',
    source: 'laozi',
    ref: 'Đạo Đức Kinh — chương 64',
    refEn: 'Daodejing — ch. 64',
    cite: 'ĐĐK 64',
    han: '九層之臺，起於累土。',
    viet: 'Đài chín tầng khởi từ những sọt đất chồng lên.',
    vietEn: 'A nine-storey terrace rises from a heap of piled earth.',
    resonance:
      'Như đài lớn bắt đầu từ nhúm đất, một hào âm ở Cấu là khởi điểm cho cả nửa năm âm khí lên. Cái lớn luôn nhú từ cái vi tế — chớ coi thường mầm nhỏ.',
    resonanceEn:
      'As a great terrace starts from a handful of earth, the single yin at Coming to Meet is the start of the whole half-year of rising yin. The great always sprouts from the minute — never scorn a small seed.',
  },
  // ―― Độn (33) — 2 âm, quân tử lui ẩn ――
  {
    id: 'cong-toai-than-thoai',
    source: 'laozi',
    ref: 'Đạo Đức Kinh — chương 9',
    refEn: 'Daodejing — ch. 9',
    cite: 'ĐĐK 9',
    han: '功遂身退，天之道。',
    viet: 'Việc xong thì lui thân — đó là Đạo của trời.',
    vietEn: 'When the work is accomplished, withdraw — this is the Dao of Heaven.',
    resonance:
      'Quẻ Độn (遯 = lui) âm khí lớn, quân tử biết rút. Trùng khít lời Lão Tử: làm tròn rồi thì lui, hợp lẽ trời — không cố bám.',
    resonanceEn:
      'Retreat (遯) has growing yin; the superior man knows to withdraw. It fits Laozi exactly: once the task is complete, withdraw — in accord with Heaven — do not cling on.',
  },
  {
    id: 'tri-chi-bat-dai',
    source: 'laozi',
    ref: 'Đạo Đức Kinh — chương 44',
    refEn: 'Daodejing — ch. 44',
    cite: 'ĐĐK 44',
    han: '知足不辱，知止不殆，可以長久。',
    viet: 'Biết đủ thì không nhục, biết dừng thì không nguy, nhờ vậy mà bền lâu.',
    vietEn: 'Know contentment and you will not be disgraced; know when to stop and you will not be endangered — thus you may last long.',
    resonance:
      'Lúc thế đang lui (Độn), biết dừng đúng chỗ là khôn ngoan. Đạo gia: dừng đúng lúc thì tránh nguy, giữ được mình lâu dài.',
    resonanceEn:
      'As the tide recedes (Retreat), knowing where to stop is wisdom. Daoism: stopping at the right time avoids danger and preserves you for the long run.',
  },
  // ―― Bĩ (12) — 3 âm, bế tắc ――
  {
    id: 'hoa-phuc-bi',
    source: 'laozi',
    ref: 'Đạo Đức Kinh — chương 58',
    refEn: 'Daodejing — ch. 58',
    cite: 'ĐĐK 58',
    han: '福兮禍之所伏，禍兮福之所倚。',
    viet: 'Phúc là chỗ hoạ nấp sau, hoạ là chỗ phúc tựa vào.',
    vietEn: 'Fortune is where misfortune lies hidden; misfortune is what fortune leans upon.',
    resonance:
      'Quẻ Bĩ = trời đất bất giao, bế tắc. Nhưng trong hoạ ẩn cơ phúc: Bĩ cực thì Thái lai. Đạo gia dạy nhìn ra mầm thông ngay giữa lúc tắc.',
    resonanceEn:
      'Standstill (Pi) = Heaven and Earth not meeting, blockage. Yet within misfortune hides opportunity: Standstill at its extreme brings Peace. Daoism teaches us to see the sprout of flow even in the midst of blockage.',
  },
  {
    id: 'dai-truc-nhuoc-khuat',
    source: 'laozi',
    ref: 'Đạo Đức Kinh — chương 45',
    refEn: 'Daodejing — ch. 45',
    cite: 'ĐĐK 45',
    han: '大直若屈，大巧若拙。',
    viet: 'Thẳng lớn trông như cong, khéo lớn trông như vụng.',
    vietEn: 'Great straightness seems bent; great skill seems clumsy.',
    resonance:
      'Thời Bĩ, quân tử “kiệm đức tị nạn”, thu mình chờ thời. Lão Tử: cái thẳng thật biết uốn theo cảnh — ẩn nhẫn không phải hèn, mà là khéo lớn.',
    resonanceEn:
      'In the time of Standstill, the superior man "restrains his virtue to avoid trouble," drawing in and biding his time. Laozi: true straightness knows how to bend with circumstance — patient reserve is not cowardice, but great skill.',
  },
  // ―― Quán (20) — 4 âm, quan sát/chiêm (Thu phân) ――
  {
    id: 'bat-xuat-ho',
    source: 'laozi',
    ref: 'Đạo Đức Kinh — chương 47',
    refEn: 'Daodejing — ch. 47',
    cite: 'ĐĐK 47',
    han: '不出戶，知天下；不闚牖，見天道。',
    viet: 'Không ra khỏi cửa mà biết thiên hạ, không nhòm qua song mà thấy đạo trời.',
    vietEn: 'Without going out the door, one knows the world; without peering through the window, one sees the Dao of Heaven.',
    resonance:
      'Quẻ Quán (觀 = xem) là chiêm nghiệm từ trên cao. Đạo gia: thấy lẽ trời nhờ quán chiếu nội tâm, không cần rong ruổi bên ngoài.',
    resonanceEn:
      'Contemplation (觀 "viewing") is reflection from above. Daoism: one sees the way of Heaven through inner contemplation, without roaming outside.',
  },
  {
    id: 'tri-hu-cuc',
    source: 'laozi',
    ref: 'Đạo Đức Kinh — chương 16',
    refEn: 'Daodejing — ch. 16',
    cite: 'ĐĐK 16',
    han: '致虛極，守靜篤。',
    viet: 'Đạt tới chỗ hư cùng cực, giữ sự tĩnh lặng cho thật bền.',
    vietEn: 'Attain utmost emptiness; hold fast to stillness.',
    resonance:
      'Quán đòi cái nhìn tĩnh. Lão Tử: hư tâm và tĩnh tới cùng thì mới “quán phục” — thấy vạn vật trở về gốc, đúng tinh thần quẻ Quán.',
    resonanceEn:
      'Contemplation demands a still gaze. Laozi: only with an empty mind and utter stillness can one "watch the return" — see all things go back to the root, the very spirit of the hexagram Contemplation.',
  },
  // ―― Bác (23) — 5 âm, bóc rụng ――
  {
    id: 'phieu-phong-bat-chung',
    source: 'laozi',
    ref: 'Đạo Đức Kinh — chương 23',
    refEn: 'Daodejing — ch. 23',
    cite: 'ĐĐK 23',
    han: '飄風不終朝，驟雨不終日。',
    viet: 'Gió lốc không thổi suốt buổi sáng, mưa rào không đổ trọn ngày.',
    vietEn: 'A whirlwind does not blow the whole morning, nor a cloudburst pour the whole day.',
    resonance:
      'Quẻ Bác = bóc rụng, âm khí gần tận diệt một dương cuối. Đạo gia an ủi: cái dữ dội nào cũng qua — bóc tới đáy thì Phục lại sinh.',
    resonanceEn:
      'Splitting Apart (Bo) = stripping away, yin nearly extinguishing the last yang. Daoism consoles: every violent thing passes — stripped to the bottom, Return is reborn.',
  },
  {
    id: 'ton-chi-nhi-ich',
    source: 'laozi',
    ref: 'Đạo Đức Kinh — chương 42',
    refEn: 'Daodejing — ch. 42',
    cite: 'ĐĐK 42',
    han: '物或損之而益，或益之而損。',
    viet: 'Vật có khi bớt đi mà lại thêm, có khi thêm vào mà lại bớt.',
    vietEn: 'Things are sometimes diminished by adding to them, and sometimes increased by taking away.',
    resonance:
      'Bác bóc gần hết dương, tưởng là mất tất — nhưng “tổn” tới cùng lại hoá “ích” (một dương sắp trở lại ở Phục). Mất–được xoay vần, đúng lẽ tiêu–tức.',
    resonanceEn:
      'Splitting Apart strips away nearly all yang, seeming total loss — yet "decrease" carried to the end becomes "increase" (a yang about to return at Fu). Loss and gain revolve, the very law of waxing and waning.',
  },
  // ―― Khôn (2) — thuần âm, đáy ――
  {
    id: 'tri-hung-thu-thu',
    source: 'laozi',
    ref: 'Đạo Đức Kinh — chương 28',
    refEn: 'Daodejing — ch. 28',
    cite: 'ĐĐK 28',
    han: '知其雄，守其雌，為天下谿。',
    viet: 'Biết phần hùng (cương) mà giữ phần thư (nhu), làm khe lạch cho thiên hạ.',
    vietEn: 'Know the masculine (firm), keep to the feminine (yielding), and be the ravine of the world.',
    resonance:
      'Khôn thuần âm — đức nhu thuận tới cực. Lão Tử đề cao “giữ phần thư”: nhu hoà chứa đựng, làm chỗ trũng cho muôn dòng — chính là đức của Đất.',
    resonanceEn:
      'Kun is pure yin — yielding devotion to the utmost. Laozi prizes "keeping to the feminine": the soft that contains, the low place all streams flow to — precisely the virtue of Earth.',
  },
  {
    id: 'huyen-tan',
    source: 'laozi',
    ref: 'Đạo Đức Kinh — chương 6',
    refEn: 'Daodejing — ch. 6',
    cite: 'ĐĐK 6',
    han: '谷神不死，是謂玄牝。玄牝之門，是謂天地根。',
    viet: 'Thần hang chẳng chết, gọi là “huyền tẫn” (mẹ nhiệm màu). Cửa huyền tẫn là gốc của trời đất.',
    vietEn: 'The spirit of the valley never dies; it is called the mysterious female. The gate of the mysterious female is the root of Heaven and Earth.',
    resonance:
      'Khôn là Đất, là Mẹ — thuần âm chứa đựng và sinh dưỡng. Lão Tử ví cái gốc sinh thành vũ trụ như “huyền tẫn”: trống rỗng, mềm, mà muôn vật từ đó ra.',
    resonanceEn:
      'Kun is Earth, the Mother — pure yin that contains and nourishes. Laozi likens the generative root of the cosmos to the "mysterious female": empty, soft, yet the source from which all things emerge.',
  },
  // ―― Khiêm (15) — đức nhún nhường (không phải Tích quái) ――
  {
    id: 'giang-hai-vi-vuong',
    source: 'laozi',
    ref: 'Đạo Đức Kinh — chương 66',
    refEn: 'Daodejing — ch. 66',
    cite: 'ĐĐK 66',
    han: '江海所以能為百谷王者，以其善下之。',
    viet: 'Sông biển sở dĩ làm vua trăm hang suối, là vì khéo ở chỗ thấp dưới chúng.',
    vietEn: 'The reason rivers and seas can be king of the hundred valleys is that they are good at staying below them.',
    resonance:
      'Quẻ Khiêm = nhún mình xuống. Lão Tử: chính nhờ ở dưới mà sông biển thu được muôn dòng — hạ mình thì quy tụ, đúng đức “khiêm tôn nhi quang”.',
    resonanceEn:
      'Modesty (Qian) = lowering oneself. Laozi: precisely by staying below, rivers and seas gather every stream — humbling oneself draws things together, the very virtue "modest yet shining."',
  },
];

// ── Điểm neo (anchor) ────────────────────────────────────────────────────────
// concept: gắn theo khuôn mẫu trong các trang. hexKingWen: gắn vào chi tiết 1 quẻ.

export const ANCHORS: WisdomAnchor[] = [
  {
    concept: 'dao-thai-cuc',
    label: 'Đạo ↔ Thái Cực',
    labelEn: 'Dao ↔ Taiji',
    quoteIds: ['dao-kha-dao', 'thien-dia-tinh-sinh'],
  },
  {
    concept: 'am-duong-bit',
    label: 'Âm–Dương ↔ bit',
    labelEn: 'Yin–Yang ↔ bit',
    quoteIds: ['dao-sinh-nhat'],
  },
  {
    concept: 'sinh-doi',
    label: 'Sinh đôi 2ⁿ ↔ “Đạo sinh Một…”',
    labelEn: 'Doubling 2ⁿ ↔ "The Dao gives birth to One…"',
    quoteIds: ['dao-sinh-nhat'],
  },
  {
    concept: 'phan-phuc',
    label: 'Phản phục ↔ tiêu–tức',
    labelEn: 'Return ↔ waxing–waning',
    quoteIds: ['phan-gia-dao-dong', 'quan-phuc-quy-can'],
  },
  {
    concept: 'vo-vi',
    label: 'Vô vi ↔ hiểu quy luật',
    labelEn: 'Wu wei ↔ understanding the law',
    quoteIds: ['vo-vi-nhi-vo-bat-vi', 'bao-dinh-giai-nguu'],
  },
  {
    concept: 'te-vat',
    label: 'Tề vật ↔ quan hệ đối/đảo',
    labelEn: 'Equalizing things ↔ Opposite/Reversed relations',
    quoteIds: ['bi-xuat-o-thi', 'mong-ho-diep'],
  },
  // ―― neo vào quẻ cụ thể ――
  {
    concept: 'hex',
    label: 'Quẻ Phục ↔ “quan phục, quy căn”',
    labelEn: 'Return ↔ "watch the return, go back to the root"',
    hexKingWen: 24, // Phục (復)
    quoteIds: ['quan-phuc-quy-can', 'phan-gia-dao-dong'],
  },
  {
    concept: 'hex',
    label: 'Quẻ Khiêm ↔ “bất tranh”',
    labelEn: 'Modesty ↔ "not contending"',
    hexKingWen: 15, // Khiêm (謙)
    quoteIds: ['bat-tranh', 'giang-hai-vi-vuong'],
  },
  {
    concept: 'hex',
    label: 'Quẻ Khảm (Nước) ↔ “thượng thiện nhược thủy”',
    labelEn: 'Water (Kan) ↔ "the highest good is like water"',
    hexKingWen: 29, // Khảm (坎)
    quoteIds: ['thuong-thien-nhuoc-thuy', 'nhu-nhuoc-thang'],
  },
  // ―― 12 Tích quái (theo pha tiêu–tức; mỗi quẻ 2 quote RIÊNG) ――
  {
    concept: 'hex',
    label: 'Quẻ Lâm ↔ mầm lớn dần',
    labelEn: 'Approach ↔ the growing sprout',
    hexKingWen: 19, // Lâm (臨)
    quoteIds: ['hop-bao-chi-moc', 'thien-ly-chi-hanh'],
  },
  {
    concept: 'hex',
    label: 'Quẻ Thái ↔ Âm–Dương giao hoà',
    labelEn: 'Peace ↔ Yin–Yang in harmony',
    hexKingWen: 11, // Thái (泰)
    quoteIds: ['hoa-thai', 'hoa-phuc-thai'],
  },
  {
    concept: 'hex',
    label: 'Quẻ Đại Tráng ↔ “vật tráng tắc lão”',
    labelEn: 'Great Power ↔ "things at their prime grow old"',
    hexKingWen: 34, // Đại Tráng (大壯)
    quoteIds: ['vat-trang-tac-lao', 'qua-nhi-vat-cuong'],
  },
  {
    concept: 'hex',
    label: 'Quẻ Quải ↔ quyết đúng lúc',
    labelEn: 'Break-through ↔ resolving at the right time',
    hexKingWen: 43, // Quải (夬)
    quoteIds: ['vi-chi-o-vi-huu', 'khuc-tac-toan'],
  },
  {
    concept: 'hex',
    label: 'Quẻ Càn ↔ “trì doanh, kháng long”',
    labelEn: 'Qian ↔ "holding it full, the arrogant dragon"',
    hexKingWen: 1, // Càn (乾)
    quoteIds: ['tri-doanh-bat-nhu', 'phu-quy-nhi-kieu'],
  },
  {
    concept: 'hex',
    label: 'Quẻ Cấu ↔ một âm chớm sinh',
    labelEn: 'Coming to Meet ↔ a single yin just born',
    hexKingWen: 44, // Cấu (姤)
    quoteIds: ['ky-an-di-tri', 'cau-ngo-vi-am'],
  },
  {
    concept: 'hex',
    label: 'Quẻ Độn ↔ “công thành thân thoái”',
    labelEn: 'Retreat ↔ "the work done, withdraw"',
    hexKingWen: 33, // Độn (遯)
    quoteIds: ['cong-toai-than-thoai', 'tri-chi-bat-dai'],
  },
  {
    concept: 'hex',
    label: 'Quẻ Bĩ ↔ trong tắc ẩn cơ',
    labelEn: 'Standstill ↔ opportunity hidden in blockage',
    hexKingWen: 12, // Bĩ (否)
    quoteIds: ['hoa-phuc-bi', 'dai-truc-nhuoc-khuat'],
  },
  {
    concept: 'hex',
    label: 'Quẻ Quán ↔ quán chiếu trong tĩnh',
    labelEn: 'Contemplation ↔ reflection in stillness',
    hexKingWen: 20, // Quán (觀)
    quoteIds: ['bat-xuat-ho', 'tri-hu-cuc'],
  },
  {
    concept: 'hex',
    label: 'Quẻ Bác ↔ bóc tới đáy thì Phục',
    labelEn: 'Splitting Apart ↔ stripped to the bottom, then Return',
    hexKingWen: 23, // Bác (剝)
    quoteIds: ['phieu-phong-bat-chung', 'ton-chi-nhi-ich'],
  },
  {
    concept: 'hex',
    label: 'Quẻ Khôn (Đất) ↔ nhu thuận',
    labelEn: 'Earth (Kun) ↔ yielding devotion',
    hexKingWen: 2, // Khôn (坤)
    quoteIds: ['tri-hung-thu-thu', 'huyen-tan'],
  },
];

// ── Lookups (dẫn xuất) ───────────────────────────────────────────────────────

const QUOTE_BY_ID = new Map(QUOTES.map((q) => [q.id, q]));

export function quoteById(id: string): WisdomQuote | undefined {
  return QUOTE_BY_ID.get(id);
}

/** Lấy quote theo concept (không tính các anchor neo-quẻ). */
export const anchorsByConcept = new Map<string, WisdomAnchor>(
  ANCHORS.filter((a) => a.concept !== 'hex').map((a) => [a.concept, a])
);

/** Lấy quote theo số Văn Vương của quẻ. */
export const anchorsByHex = new Map<number, WisdomAnchor>(
  ANCHORS.filter((a) => a.hexKingWen != null).map((a) => [a.hexKingWen as number, a])
);

/** Trả danh sách quote đã “nở” cho 1 anchor. */
export function quotesOf(anchor: WisdomAnchor): WisdomQuote[] {
  return anchor.quoteIds
    .map((id) => QUOTE_BY_ID.get(id))
    .filter((q): q is WisdomQuote => q != null);
}
