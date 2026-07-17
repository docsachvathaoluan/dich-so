// ───────────────────────────────────────────────────────────────────────────
// Diễn giải 64 quẻ.
//   `judgmentClassic` (Thoán/卦辞) & `imageClassic` (Đại Tượng/大象): điền ĐỦ 64 quẻ,
//     nguyên văn Hán đối chiếu nguồn canon (ctext.org / Wikisource 周易 — văn bản ổn định,
//     khớp theo CHỮ HÁN tên quẻ để không lấy nhầm), phần Việt là tóm ý sát nghĩa.
//   `modernShort` + `keywords`: diễn giải NGẮN cho đủ 64 quẻ.
//   `modernDeep`: object 5 tiểu mục (cấu trúc / biến hóa / nhị phân / hào vị / ánh xạ hiện đại).
// LƯU Ý: `modernShort` và `modernDeep` là phần TỔNG HỢP & DIỄN GIẢI HIỆN ĐẠI của dự án (neo
//   vào nghĩa cốt lõi đã cross-check ≥2 nguồn), KHÔNG phải dịch nguyên văn; mục hào vị
//   (linePositions) là khung diễn giải TRUYỀN THỐNG.
// ───────────────────────────────────────────────────────────────────────────

import type { DeepInterpretation, HexagramEn } from '@/types';

export interface Interpretation {
  modernShort: string;
  keywords: string[];
  judgmentClassic?: string;
  imageClassic?: string;
  modernDeep?: DeepInterpretation;
  /** Bản EN (điền dần theo Đợt 3). Copy vào Hexagram.en khi lắp ráp. */
  en?: HexagramEn;
}

export const INTERPRETATIONS: Record<number, Interpretation> = {
  1: {
    modernShort:
      'Sức sáng tạo thuần khiết đang dâng — thời điểm khởi xướng, dẫn dắt và bền chí tiến lên như trời vận hành không nghỉ.',
    keywords: ['sáng tạo', 'lãnh đạo', 'chủ động'],
    judgmentClassic: 'Nguyên, Hanh, Lợi, Trinh (元亨利貞).',
    imageClassic: 'Trời vận hành mạnh mẽ; người quân tử tự cường không ngừng (天行健，君子以自強不息).',
    modernDeep: {
      structureInsight:
        'Sáu hào đều dương: thuần một loại năng lượng, không pha tạp — sức sáng tạo và chủ động ở dạng nguyên chất nhất. Chính vì nguyên chất nên cũng dễ thái quá nếu không tự tiết chế.',
      transformInsight:
        'Vì thuần dương nên lật ngược (đảo) hay rút lõi (hỗ) đều trả về chính Càn; chỉ phép đảo toàn bộ âm–dương (đối) mới biến thành Khôn. Càn và Khôn là hai cực gốc, 62 quẻ còn lại đều nằm giữa hai cực này.',
      binaryInsight:
        'Giá trị 63 = tất cả sáu bit đều bật — điểm tận cùng của thang nhị phân 0–63, đối xứng tuyệt đối với Khôn = 0 ở đầu thang.',
      linePositions:
        'Hào dương đắc chính ở các vị lẻ (1, 3, 5); ở vị chẵn thì phần "cương" hơi lệch chỗ. Hào 5 vừa trung vừa chính — vị "rồng bay" tiêu biểu cho lúc sung sức nhất. Đáng chú ý: vì thuần dương, không cặp hào nào âm–dương ứng nhau, nên đây là sức mạnh đồng loạt mà thiếu sự bổ sung mềm.',
      modernMapping:
        'Đây là pha khởi xướng và dẫn dắt: ý tưởng, dự án, hay vai trò lãnh đạo đang ở đỉnh năng lượng. Hợp để mở đường, đặt nền, kéo người khác đi theo.\n\nNhưng tượng "rồng lên quá cao thì hối tiếc" (hào 6) nhắc: sức dương thuần không biết dừng sẽ hóa cương cường, đơn độc. Mạnh nhất là khi biết khi nào nên lùi, để chỗ cho cái mềm bổ trợ.\n\nBốn đức "Nguyên – Hanh – Lợi – Trinh" trong lời quẻ gói cả một vòng sinh trưởng như bốn mùa: Nguyên là khởi đầu (Xuân), Hanh là lớn lên/hanh thông (Hạ), Lợi là kết quả được thỏa (Thu), Trinh là thành tựu bền giữ (Đông). Trong cả 64 quẻ, chỉ Càn và Khôn mới hội đủ trọn bốn đức này.\n\nCó hai lối hiểu, đều là cách đọc truyền thống có nguồn (nên ghi cả hai): theo Trình Di, đây là bốn ĐỨC TÍNH của đạo quân tử; theo Chu Hy, đây là một LỜI ĐOÁN — "rất hanh thông, và lợi về đường chính bền". Cốt lõi nằm ở chữ Trinh (ngay thẳng + bền vững): Càn mạnh nhất, hanh thông nhất, vậy mà lời quẻ vẫn nhấn "lợi trinh" — vì thông mà không chính bền thì không giữ được lâu. Kinh Dịch luôn nói "lợi trinh", "trinh cát" chứ không "bất trinh cát"; đó gần như là thông điệp đạo đức xuyên suốt cả sách.',
    },
    en: {
      modernShort:
        'Pure creative force is surging — a time to initiate, to lead, and to press on with perseverance, like heaven moving without rest.',
      keywords: ['creativity', 'leadership', 'initiative'],
      judgmentGloss:
        'Originating, pervading, furthering, persevering — the four virtues (元亨利貞).',
      imageGloss:
        'Heaven moves with strength; the noble person accordingly makes themselves strong and untiring (天行健，君子以自強不息).',
      modernDeep: {
        structureInsight:
          'All six lines are yang: a single, unmixed kind of energy — creativity and initiative in their purest form. Precisely because it is unmixed, it also tips easily into excess without self-restraint.',
        transformInsight:
          'Being pure yang, both inverting it (the reversed) and drawing out its core (the nuclear) return to Qian itself; only flipping every line yin↔yang (the opposite) turns it into Kun. Qian and Kun are the two root poles, and the other 62 hexagrams all lie between them.',
        binaryInsight:
          'Value 63 = all six bits on — the very top of the 0–63 binary scale, in perfect symmetry with Kun = 0 at the bottom.',
        linePositions:
          'Yang lines are "correct" in the odd places (1, 3, 5); in the even places the firmness sits slightly out of position. Line 5 is both central and correct — the "flying dragon" place, emblem of peak vigor. Notably, being all yang, no pair of lines resonates as yin–yang, so this is collective strength lacking the complement of the soft.',
        modernMapping:
          'This is the phase of initiating and leading: an idea, a project, or a leadership role at peak energy. Good for opening the way, laying foundations, and drawing others along.\n\nBut the image of "the dragon flown too high has regrets" (line 6) warns: pure yang that does not know when to stop hardens into rigidity and isolation. It is strongest when it knows when to step back and leave room for the soft to complement it.\n\nThe four virtues "Yuan–Heng–Li–Zhen" in the judgment wrap a whole cycle of growth, like the four seasons: Yuan is the origin (Spring), Heng is growth/pervasion (Summer), Li is fulfilled harvest (Autumn), Zhen is enduring completion (Winter). Among all 64 hexagrams, only Qian and Kun hold all four in full.\n\nThere are two readings, both sourced traditions (so we note both): for Cheng Yi these are four VIRTUES of the noble way; for Zhu Xi this is a DIVINATORY verdict — "greatly pervading, and furthering through a firm, correct course." The heart lies in Zhen (uprightness + endurance): Qian is the strongest and most pervading, yet the judgment still stresses "furthering through perseverance" — because pervasion without a firm, correct course cannot last. The Changes always say "furthering through perseverance," never "furthering without it"; that is almost the moral thread running through the whole book.',
      },
    },
  },
  2: {
    modernShort:
      'Sức nâng đỡ và bao dung — thành công đến từ thuận theo và kiên nhẫn hiện thực hoá, thay vì áp đặt.',
    keywords: ['tiếp nhận', 'nuôi dưỡng', 'thuận'],
    judgmentClassic: 'Nguyên hanh, lợi về sự bền của ngựa cái (元亨，利牝馬之貞).',
    imageClassic: 'Thế đất dày; người quân tử lấy đức dày để nâng chở muôn vật (地勢坤，君子以厚德載物).',
    modernDeep: {
      structureInsight:
        'Sáu hào đều âm: thuần sức thuận theo, nâng đỡ và bao dung — không khởi xướng mà hoàn thành, không áp đặt mà ôm chứa. Là cực còn lại đối với Càn.',
      transformInsight:
        'Đối xứng gương của Càn: quẻ đối là Càn (#1), còn đảo và hỗ đều trả về chính Khôn. Hai quẻ thuần này là hai đầu mút, mọi quẻ pha trộn đều nằm giữa.',
      binaryInsight:
        'Giá trị 0 = không bit nào bật — đầu thang nhị phân 0–63, đối xứng tuyệt đối với Càn = 63 ở cuối thang.',
      linePositions:
        'Hào âm đắc chính ở các vị chẵn (2, 4, 6); hào 2 vừa trung vừa chính — đức thuận đặt đúng chỗ. Như Càn, vì thuần một loại khí nên không cặp hào nào ứng nhau: sức nâng đỡ đồng đều mà thiếu đối trọng cứng.',
      modernMapping:
        'Pha của tiếp nhận, nuôi dưỡng và thực thi: hợp để đỡ việc người khác khởi, biến ý tưởng thành hiện thực, giữ cho hệ thống bền.\n\nSức mạnh ở đây là "đi sau mà tới": dẫn trước thì lạc, theo sau thì được chủ (lời quẻ "tiên mê hậu đắc"). Bao dung như đất, nhưng vẫn cần phương hướng để cái thuận không thành buông xuôi.',
    },
    en: {
      modernShort:
        'The power to uphold and embrace — success comes from following and patiently making things real, not from imposing.',
      keywords: ['receptivity', 'nurturing', 'devotion'],
      judgmentGloss:
        'Originating and pervading; furthering through the perseverance of a mare (元亨，利牝馬之貞).',
      imageGloss:
        'The earth’s condition is receptive devotion; the noble person carries the world with breadth of character (地勢坤，君子以厚德載物).',
      modernDeep: {
        structureInsight:
          'All six lines are yin: pure yielding, support, and containment — it does not initiate but completes, does not impose but embraces. It is the opposite pole to Qian.',
        transformInsight:
          'A mirror image of Qian: its opposite is Qian (#1), while both its reversed and its nuclear return to Kun itself. These two pure hexagrams are the endpoints; every mixed hexagram lies between them.',
        binaryInsight:
          'Value 0 = no bit on — the bottom of the 0–63 binary scale, in perfect symmetry with Qian = 63 at the top.',
        linePositions:
          'Yin lines are "correct" in the even places (2, 4, 6); line 2 is both central and correct — the virtue of yielding placed exactly right. As with Qian, being one pure kind of energy, no pair of lines resonates: even support without a firm counterweight.',
        modernMapping:
          'The phase of receiving, nurturing, and carrying out: good for supporting what others begin, turning ideas into reality, keeping a system durable.\n\nIts strength is "arriving by following": lead first and you go astray, follow and you find your master (the judgment: "first confused, later gains"). Embrace like the earth — yet even yielding needs a direction, or it slackens into mere passivity.',
      },
    },
  },
  3: {
    modernShort:
      'Cái mới nhú lên giữa hỗn mang — khởi đầu rối ren, cần kiên nhẫn sắp xếp và tìm cộng sự trước khi bung ra.',
    keywords: ['khởi đầu khó', 'rối ren', 'gây dựng'],
    judgmentClassic:
      'Rất hanh thông, lợi về giữ chính; chớ vội có chỗ đi, lợi về việc dựng người giúp (屯：元亨，利貞，勿用有攸往，利建侯).',
    imageClassic:
      'Mây và sấm (mây tụ, sấm động giữa hỗn mang), là Truân; người quân tử nhân đó lo việc kinh bang tế thế (雲雷，屯；君子以經綸).',
    modernDeep: {
      structureInsight:
        'Nước hiểm (Khảm) ở trên, sấm động (Chấn) ở dưới: bên trong muốn bật dậy mà bên ngoài còn vây hãm. Đúng cảnh mầm non vừa nhú đã gặp đất cứng — "truân" vốn là hình mầm cây cố xuyên mặt đất.',
      transformInsight:
        'Lật ngược thành Mông (#4): cùng một "khởi đầu" nhìn hai phía — chủ động gây dựng (Truân) và được khai tâm dẫn dắt (Mông). Hai quẻ đi thành cặp ngay đầu 64 quẻ, ngụ ý mọi sự bắt đầu đều vừa rối vừa non.',
      binaryInsight:
        'Ô (hàng 2 = Khảm, cột 1 = Chấn) trong ma trận Phục Hy — một tổ hợp nằm sớm trên thang, hợp với nghĩa "giai đoạn đầu" của một tiến trình.',
      linePositions:
        'Hiếm gặp: cả hào 2 và hào 5 đều trung chính, lại có ứng với nhau (cặp 2–5) — giữa gian nan vẫn còn một trục trên–dưới nương tựa. Hào sơ (dương, đắc chính) là người chủ động gây dựng nhưng còn ở đáy, nên cổ thư nói "lợi về việc dựng người giúp việc".',
      modernMapping:
        'Giống pha khởi nghiệp giữa hỗn mang: nguồn lực chưa định hình, đường đi chưa rõ, lực bên trong thì sốt ruột muốn bung.\n\nViệc cần không phải là lao ra, mà là kiên nhẫn dựng cấu trúc và tìm cộng sự tin cậy. Rối ren ở đây là bình thường của mọi khởi đầu — vượt được thì mới có cái để lớn.',
    },
    en: {
      modernShort:
        'The new sprouting amid chaos — a tangled beginning that needs patient ordering and allies before it can burst forth.',
      keywords: ['hard beginning', 'tangle', 'founding'],
      judgmentGloss:
        'Greatly pervading, furthering through perseverance; do not rush to have somewhere to go — it furthers to establish helpers (元亨，利貞，勿用有攸往，利建侯).',
      imageGloss:
        'Clouds and thunder gather amid chaos: Difficulty at the Beginning; the noble person accordingly brings order out of the tangle (雲雷，屯；君子以經綸).',
      modernDeep: {
        structureInsight:
          'Dangerous water (Kan) above, stirring thunder (Zhen) below: the inside wants to spring up while the outside still hems it in. Just like a shoot barely emerged that meets hard ground — "Zhun" pictures a sprout straining to pierce the earth.',
        transformInsight:
          'Inverted, it becomes Youthful Folly (#4): the same "beginning" seen from two sides — actively founding (Zhun) and being enlightened and guided (Meng). The two form a pair right at the start of the 64, implying every beginning is at once tangled and green.',
        binaryInsight:
          'Cell (row 2 = Kan, col 1 = Zhen) in the Fu Xi matrix — a combination that falls early on the scale, fitting the sense of an early stage in a process.',
        linePositions:
          'Rare: both line 2 and line 5 are central and correct, and they resonate (the 2–5 pair) — amid hardship there is still a supporting upper–lower axis. The bottom line (yang, correct) is the one who actively founds but still sits at the base, so the classic says "it furthers to establish helpers."',
        modernMapping:
          'Like a startup phase amid chaos: resources not yet shaped, the path unclear, the inner force impatient to burst out.\n\nWhat is needed is not to charge out but to patiently build structure and find trustworthy partners. The tangle here is normal to every beginning — get through it and you have something to grow.',
      },
    },
  },
  4: {
    modernShort:
      'Sự ngây ngô của người mới — đây là lúc khiêm tốn học hỏi, để được dẫn dắt khai mở trí tuệ.',
    keywords: ['non dại', 'học hỏi', 'khai mở'],
    judgmentClassic:
      'Hanh thông. Không phải ta cầu trẻ thơ, mà trẻ thơ cầu ta; bói lần đầu thì bảo, hỏi nhiễu nhiều lần thì không bảo. Lợi về giữ chính (蒙：亨。匪我求童蒙，童蒙求我。初筮告，再三瀆，瀆則不告。利貞).',
    imageClassic:
      'Dưới núi có suối chảy ra, là Mông; người quân tử nhân đó làm việc quả quyết để nuôi dưỡng đức (山下出泉，蒙；君子以果行育德).',
    modernDeep: {
      structureInsight:
        'Núi (Cấn, dừng lại) ở trên, nước (Khảm, hiểm) ở dưới: dòng suối non vừa ra khỏi núi còn chưa biết chảy về đâu — đúng tượng trí non dại cần được khai mở.',
      transformInsight:
        'Là quẻ đảo của Truân (#3): Truân là khởi đầu rối ren nhìn từ người gây dựng, Mông là cũng khởi đầu ấy nhìn từ kẻ còn non cần học. Hỗ là Phục (#24) — mầm dương trở lại, gợi việc khai tâm nhen lại ánh sáng.',
      binaryInsight:
        'Giá trị 34, ô (hàng 4 = Cấn, cột 2 = Khảm) — núi trên nước, tổ hợp nằm ở nửa sau thang.',
      linePositions:
        'Hào 2 (dương, đắc trung ở dưới) ứng với hào 5 (âm ở trên): thầy cứng và trò mềm tìm đến nhau — cốt lõi của việc dạy–học. Cả quẻ không hào nào vừa trung vừa chính, hợp cảnh "còn đang học, chưa hoàn thiện".',
      modernMapping:
        'Giai đoạn của người mới: chưa biết đủ để tự quyết — nhưng đó không phải điều xấu, đó là lúc nên khiêm tốn học.\n\nMấu chốt: việc học chỉ hiệu quả khi người học chủ động cầu (trẻ thơ cầu ta), và hỏi với sự tập trung. Hỏi nhì nhằng cho có chỉ làm loãng cả thầy lẫn trò.',
    },
    en: {
      modernShort:
        'The naivety of the beginner — a time to learn humbly and let a guide open the mind.',
      keywords: ['inexperience', 'learning', 'awakening'],
      judgmentGloss:
        'Pervading. It is not I who seek the young fool; the young fool seeks me. The first oracle informs; asked again and again it is profaned, and the profaned is not informed. Furthering through perseverance (匪我求童蒙，童蒙求我…利貞).',
      imageGloss:
        'Below the mountain a spring issues forth: Youthful Folly; the noble person accordingly acts with decision and nurtures character (山下出泉，蒙；君子以果行育德).',
      modernDeep: {
        structureInsight:
          'Mountain (Gen, stopping) above, water (Kan, danger) below: a young spring just out of the mountain, not yet knowing where to flow — the very image of a green, untrained mind that needs opening.',
        transformInsight:
          'It is the reversed of Zhun (#3): Zhun is the tangled beginning seen from the founder, Meng is that same beginning seen from the one still green and needing to learn. Its nuclear is Return (#24) — the yang sprout coming back, hinting that enlightening the mind rekindles the light.',
        binaryInsight:
          'Value 34, cell (row 4 = Gen, col 2 = Kan) — mountain over water, a combination in the latter half of the scale.',
        linePositions:
          'Line 2 (yang, central below) resonates with line 5 (yin above): a firm teacher and a yielding student seeking each other — the heart of teaching and learning. No line here is both central and correct, fitting "still learning, not yet complete."',
        modernMapping:
          'The beginner’s phase: not knowing enough to decide alone — but that is no flaw, it is the time to learn humbly.\n\nThe key: learning works only when the learner actively seeks it (the young fool seeks me) and asks with focus. Idle, repeated questioning only muddies both teacher and student.',
      },
    },
  },
  5: {
    modernShort:
      'Chờ đợi có niềm tin — nuôi sức và giữ bình tĩnh trước hiểm; thời cơ đến với người biết đợi.',
    keywords: ['chờ thời', 'kiên nhẫn', 'tích lực'],
    judgmentClassic:
      'Có niềm tin, sáng sủa hanh thông; giữ chính thì tốt, lợi về vượt sông lớn (需：有孚，光亨。貞吉，利涉大川).',
    imageClassic:
      'Mây lên trên trời, là Nhu (chờ); người quân tử nhân đó ăn uống, an dưỡng mà chờ thời (雲上於天，需；君子以飲食宴樂).',
    modernDeep: {
      structureInsight:
        'Mây/nước (Khảm) ở trên, trời (Càn) ở dưới: mây đã tụ trên cao nhưng mưa chưa rơi — sức (Càn) đã sẵn nhưng phải đợi đúng thời mới tuôn.',
      transformInsight:
        'Đảo thành Tụng (#6): chờ đợi mà hỏng thì hóa kiện tụng — "đợi" và "tranh" là hai mặt khi nhu cầu chưa được đáp. Đối là Tấn (#35, tiến lên rạng rỡ), hỗ là Khuê (#38).',
      binaryInsight:
        'Giá trị 23, ô (hàng 2 = Khảm, cột 7 = Càn) — hiểm đặt trên sức mạnh thuần, nên sức phải nén lại mà chờ.',
      linePositions:
        'Hào 5 (dương) vừa trung vừa chính, đứng giữa hiểm (Khảm) mà vững — tượng người đợi có niềm tin, không nao núng. "Chờ" ở đây là chủ động giữ vị, không phải thụ động.',
      modernMapping:
        'Khi điều kiện chưa chín, vội lao tới là hỏng. Nhu dạy cái "chờ" tích cực: nuôi sức, giữ bình tĩnh, tin rằng thời cơ sẽ đến với người sẵn sàng.\n\nHình ảnh "ăn uống yến lạc" rất hiện đại: trong lúc chờ, hãy phục hồi và dưỡng lực, thay vì sốt ruột đốt năng lượng vô ích.',
    },
    en: {
      modernShort:
        'Waiting with confidence — build strength and stay calm before danger; the moment comes to those who can wait.',
      keywords: ['waiting', 'patience', 'gathering strength'],
      judgmentGloss:
        'There is sincerity, radiant and pervading; perseverance brings good fortune; it furthers to cross the great water (有孚，光亨。貞吉，利涉大川).',
      imageGloss:
        'Clouds rise up to heaven: Waiting; the noble person accordingly eats, drinks, and stays at ease (雲上於天，需；君子以飲食宴樂).',
      modernDeep: {
        structureInsight:
          'Cloud/water (Kan) above, heaven (Qian) below: the clouds have gathered on high but the rain has not yet fallen — the strength (Qian) is ready but must await the right moment to pour.',
        transformInsight:
          'Reversed, it becomes Conflict (#6): waiting gone wrong turns into litigation — "waiting" and "contending" are two faces of a need not yet met. Its opposite is Progress (#35, advancing in brightness); its nuclear is Opposition (#38).',
        binaryInsight:
          'Value 23, cell (row 2 = Kan, col 7 = Qian) — danger set over pure strength, so the strength must hold back and wait.',
        linePositions:
          'Line 5 (yang) is both central and correct, standing firm in the midst of danger (Kan) — the image of one who waits with confidence and does not waver. "Waiting" here is actively holding one’s position, not passivity.',
        modernMapping:
          'When conditions are not yet ripe, rushing in ruins things. Waiting teaches the active kind of "wait": build strength, keep calm, trust that the moment will come to the ready.\n\nThe image of "eating and drinking at ease" is very modern: while you wait, recover and nourish yourself rather than burning energy in impatience.',
      },
    },
  },
  6: {
    modernShort:
      'Mâu thuẫn nảy sinh — cân nhắc nhượng bộ, tìm trung gian; thắng bằng cãi vã thường thua về lâu dài.',
    keywords: ['tranh chấp', 'hoà giải', 'thận trọng'],
    judgmentClassic:
      'Có niềm tin nhưng bị nghẽn nên lo sợ; giữ đạo trung thì tốt, theo đến cùng thì xấu. Lợi gặp người lớn, không lợi vượt sông lớn (訟：有孚，窒，惕，中吉，終凶。利見大人，不利涉大川).',
    imageClassic:
      'Trời và nước vận hành trái chiều nhau, là Tụng; người quân tử nhân đó khi làm việc thì lo tính ngay từ đầu (天與水違行，訟；君子以作事謀始).',
    modernDeep: {
      structureInsight:
        'Trời (Càn) bốc lên, nước (Khảm) chảy xuống: hai bên đi ngược hướng, không gặp nhau — tượng mâu thuẫn nảy sinh từ chỗ mỗi bên một ngả.',
      transformInsight:
        'Đảo của Nhu (#5): chờ đợi không thành thì sinh tranh chấp. Hỗ là Gia Nhân (#37, trật tự trong nhà) — gợi rằng tranh chấp được hóa giải khi quay về kỷ cương gốc. Đối là Minh Di (#36).',
      binaryInsight:
        'Giá trị 58, ô (hàng 7 = Càn, cột 2 = Khảm) — sức mạnh thuần đặt trên hiểm, dễ thành đối đầu.',
      linePositions:
        'Hào 5 (dương) trung chính = "người lớn" công minh để cậy nhờ phân xử. Lời quẻ "lợi gặp người lớn": khi tranh chấp, tìm trọng tài chính trực hơn là cố thắng đến cùng.',
      modernMapping:
        'Mâu thuẫn đến từ việc hai bên đi ngược hướng. Tụng khuyên lo liệu rõ ràng ngay từ đầu (hợp đồng, kỳ vọng, ranh giới) để bớt tranh về sau.\n\nKhi đã vào tranh chấp: "trung cát, chung hung" — dừng ở mức hợp lý thì còn tốt, đẩy tới cùng thường cùng thua. Tìm trung gian thay vì quyết ăn–thua.',
    },
    en: {
      modernShort:
        'Conflict arises — weigh concession and seek a mediator; winning by quarrel usually loses in the long run.',
      keywords: ['dispute', 'mediation', 'caution'],
      judgmentGloss:
        'There is sincerity, but it is blocked, so one is wary; holding to the center brings fortune, pushing to the end brings misfortune. It furthers to see the great person, not to cross the great water (有孚窒惕，中吉終凶…).',
      imageGloss:
        'Heaven and water move in opposite directions: Conflict; the noble person accordingly plans well at the very start of any undertaking (天與水違行，訟；君子以作事謀始).',
      modernDeep: {
        structureInsight:
          'Heaven (Qian) rises, water (Kan) flows down: the two go opposite ways and never meet — the image of conflict born of each side heading its own direction.',
        transformInsight:
          'The reversed of Waiting (#5): when waiting fails, dispute is born. Its nuclear is The Family (#37, order within the home) — hinting that conflict is resolved by returning to root discipline. Its opposite is Darkening of the Light (#36).',
        binaryInsight:
          'Value 58, cell (row 7 = Qian, col 2 = Kan) — pure strength set over danger, easily turning into confrontation.',
        linePositions:
          'Line 5 (yang) is central and correct = the fair-minded "great person" to rely on for judgment. The judgment "it furthers to see the great person": in a dispute, seek an upright arbiter rather than trying to win at all costs.',
        modernMapping:
          'Conflict comes from two sides heading opposite ways. This hexagram advises planning clearly from the very start (contracts, expectations, boundaries) to reduce later disputes.\n\nOnce in a dispute: "the center brings fortune, the end brings misfortune" — stopping at a reasonable point is still good, pushing to the bitter end usually means both lose. Seek a mediator, not a winner-takes-all fight.',
      },
    },
  },
  7: {
    modernShort:
      'Huy động lực lượng có kỷ luật — cần người chỉ huy chính trực và mục tiêu rõ để dẫn dắt đám đông.',
    keywords: ['tổ chức', 'kỷ luật', 'lãnh đạo'],
    judgmentClassic:
      'Giữ chính; có bậc trưởng lão (tướng tài) thì tốt, không lỗi (師：貞丈人吉，无咎).',
    imageClassic:
      'Trong lòng đất có nước, là Sư (quân đội); người quân tử nhân đó dung chứa dân và nuôi dưỡng số đông (地中有水，師；君子以容民畜衆).',
    modernDeep: {
      structureInsight:
        'Đất (Khôn) ở trên ôm lấy nước (Khảm) ở dưới: nước tụ ngầm trong đất như quân ẩn trong dân — tượng tổ chức lực lượng dưới một kỷ cương bao trùm.',
      transformInsight:
        'Đảo thành Tỷ (#8): tập hợp người để chinh chiến (Sư) lật mặt thành tập hợp người để gắn bó (Tỷ) — cùng là quy tụ số đông, khác ở mục đích. Hỗ là Phục (#24). Đối là Đồng Nhân (#13).',
      binaryInsight:
        'Giá trị 2, ô (hàng 0 = Khôn, cột 2 = Khảm) — nằm rất sớm trên thang; chỉ một hào dương (hào 2) giữa năm hào âm.',
      linePositions:
        'Cả quẻ chỉ một hào dương ở vị 2, đắc trung và ứng với hào 5 (vị vua): tượng vị tướng duy nhất nắm quyền chỉ huy nhưng phụng mệnh người trên. Một người cứng cầm cương cả khối đông mềm.',
      modernMapping:
        'Huy động số đông cần một trục chỉ huy chính trực và mục tiêu rõ. Quân tử "dung dân nuôi chúng": sức mạnh tổ chức được nuôi trong lòng cộng đồng, không tách rời nó.\n\nKỷ luật là cốt, nhưng kỷ luật phục vụ chính nghĩa; lực lượng không có người cầm đầu xứng đáng thì hóa loạn.',
    },
    en: {
      modernShort:
        'Mobilizing a disciplined force — it needs an upright commander and a clear aim to lead the multitude.',
      keywords: ['organization', 'discipline', 'leadership'],
      judgmentGloss:
        'Perseverance; with an elder (an able general) there is good fortune and no blame (貞丈人吉，无咎).',
      imageGloss:
        'Within the earth is water: the Army; the noble person accordingly embraces the people and nurtures the multitude (地中有水，師；君子以容民畜衆).',
      modernDeep: {
        structureInsight:
          'Earth (Kun) above enfolds water (Kan) below: water gathered hidden in the earth like an army hidden among the people — the image of organizing a force under an all-embracing discipline.',
        transformInsight:
          'Reversed, it becomes Holding Together (#8): gathering people to make war (Army) flips into gathering people to bond (Union) — both mass a multitude, differing in purpose. Its nuclear is Return (#24). Its opposite is Fellowship with Men (#13).',
        binaryInsight:
          'Value 2, cell (row 0 = Kun, col 2 = Kan) — very early on the scale; a single yang line (line 2) among five yin lines.',
        linePositions:
          'The whole hexagram has just one yang line, at place 2, central and resonating with line 5 (the ruler’s place): the image of the sole general who holds command yet serves the one above. One firm hand reins in a whole soft multitude.',
        modernMapping:
          'Mobilizing a multitude needs an upright axis of command and a clear aim. The noble person "embraces the people and nurtures the multitude": organizational strength is raised within the community, not apart from it.\n\nDiscipline is the core, but discipline serves a just cause; a force without a worthy leader descends into chaos.',
      },
    },
  },
  8: {
    modernShort:
      'Liên kết và quy tụ — gắn bó quanh một trung tâm đáng tin; đến sớm và chân thành thì được nhận.',
    keywords: ['đoàn kết', 'gắn bó', 'tin cậy'],
    judgmentClassic:
      'Tốt. Xét lại từ gốc, giữ đạo lâu bền chính đáng thì không lỗi; kẻ chưa yên tìm đến, ai đến muộn thì xấu (比：吉。原筮元永貞，无咎。不寧方來，後夫凶).',
    imageClassic:
      'Trên mặt đất có nước, là Tỷ (gần gũi); các tiên vương nhân đó dựng muôn nước, thân với chư hầu (地上有水，比；先王以建萬國，親諸侯).',
    modernDeep: {
      structureInsight:
        'Nước (Khảm) trên đất (Khôn): nước thấm sát mặt đất không kẽ hở — tượng sự gắn bó, quy tụ quanh một trung tâm.',
      transformInsight:
        'Đảo của Sư (#7): quân đội (Sư) và liên kết thân ái (Tỷ) là hai mặt của "tụ người". Hỗ là Bác (#23) — nhắc rằng liên kết lỏng lẻo, sai trung tâm thì dễ rã. Đối là Đại Hữu (#14).',
      binaryInsight:
        'Giá trị 16, ô (hàng 2 = Khảm, cột 0 = Khôn) — chỉ một hào dương ở vị 5 giữa năm hào âm.',
      linePositions:
        'Một hào dương duy nhất ở vị 5, vừa trung vừa chính = minh chủ đáng tin để mọi hào âm quy về. Khác Sư (dương ở vị 2, là tướng), Tỷ đặt dương ở vị tôn (5): trung tâm của sự gắn kết.',
      modernMapping:
        'Gắn bó bền cần một trung tâm đáng tin và sự chân thành đến sớm. "Đến muộn thì xấu": cơ hội liên kết có thời điểm, chần chừ là lỡ.\n\nLiên minh, đội nhóm, cộng đồng đều mạnh khi xoay quanh một giá trị/người dẫn dắt chính danh, và khi mỗi thành viên chủ động tìm đến thay vì bị gom lại.',
    },
    en: {
      modernShort:
        'Bonding and gathering — draw together around a trustworthy center; those who come early and sincerely are received.',
      keywords: ['solidarity', 'bonding', 'trust'],
      judgmentGloss:
        'Good fortune. Inquire again from the source: with lasting, correct perseverance there is no blame; the restless come to you; those who come late meet misfortune (吉。原筮元永貞，无咎。不寧方來，後夫凶).',
      imageGloss:
        'On the earth there is water: Holding Together; the ancient kings accordingly founded the myriad states and drew close to the feudal lords (地上有水，比；先王以建萬國，親諸侯).',
      modernDeep: {
        structureInsight:
          'Water (Kan) over earth (Kun): water soaks into the surface of the earth with no gap — the image of bonding, gathering around a center.',
        transformInsight:
          'The reversed of the Army (#7): the army (Army) and loving union (Holding Together) are two faces of "massing people." Its nuclear is Splitting Apart (#23) — a reminder that loose bonding around the wrong center easily falls apart. Its opposite is Possession in Great Measure (#14).',
        binaryInsight:
          'Value 16, cell (row 2 = Kan, col 0 = Kun) — a single yang line at place 5 among five yin lines.',
        linePositions:
          'The one yang line at place 5, central and correct = a trustworthy sovereign to whom all the yin lines turn. Unlike the Army (yang at place 2, the general), Holding Together sets the yang in the honored place (5): the center of the bond.',
        modernMapping:
          'Lasting bonds need a trustworthy center and sincerity that comes early. "Those who come late meet misfortune": the chance to bond has its moment, and hesitation misses it.\n\nAlliances, teams, and communities are all strong when they revolve around a rightful value or leader, and when each member steps forward of their own accord rather than being herded together.',
      },
    },
  },
  9: {
    modernShort:
      'Tích góp từng chút — sức còn nhỏ, chưa thể làm lớn; kiềm chế và chuẩn bị, mây tụ chưa thành mưa.',
    keywords: ['tích luỹ nhỏ', 'kiềm chế', 'chuẩn bị'],
    judgmentClassic:
      'Hanh thông. Mây dày mà chưa mưa, từ cõi tây của ta (小畜：亨。密雲不雨，自我西郊).',
    imageClassic:
      'Gió đi trên trời, là Tiểu Súc; người quân tử nhân đó trau dồi vẻ đẹp của văn đức (風行天上，小畜；君子以懿文德).',
    modernDeep: {
      structureInsight:
        'Gió (Tốn) trên trời (Càn): gió chỉ lay động được mây chứ chưa làm thành mưa — sức kìm giữ còn nhỏ, chỉ đủ tích chứ chưa đủ thành.',
      transformInsight:
        'Đảo thành Lý (#10, bước đi thận trọng). Một hào âm (hào 4) cố ghìm năm hào dương: lực nhỏ kìm lực lớn, nên chỉ "súc" được chút ít. Đối là Dự (#16), hỗ là Khuê (#38).',
      binaryInsight:
        'Giá trị 55, ô (hàng 6 = Tốn, cột 7 = Càn) — chỉ một hào âm ở vị 4 giữa năm hào dương.',
      linePositions:
        'Hào 4 (âm, đắc chính) là hào "chủ" duy nhất mềm, một mình ghìm cả khối dương; vì lực quá chênh nên chỉ tích lũy được nhỏ. Hào 5 (dương, trung chính) trợ lực cho hào 4.',
      modernMapping:
        'Khi nguồn lực/ảnh hưởng còn nhỏ, đừng mưu việc lớn: hãy tích từng chút và trau giồi "văn đức" — năng lực mềm, uy tín, quan hệ.\n\n"Mây dày chưa mưa": mọi điều kiện đang tụ nhưng chưa đủ ngưỡng. Kiên nhẫn bồi thêm thay vì ép một kết quả non.',
    },
    en: {
      modernShort:
        'Accumulating bit by bit — strength is still small, not yet ready for big moves; restrain and prepare, the clouds gather but no rain yet.',
      keywords: ['small accumulation', 'restraint', 'preparation'],
      judgmentGloss:
        'Pervading. Dense clouds, no rain, from our western outskirts (亨。密雲不雨，自我西郊).',
      imageGloss:
        'Wind moves across the heavens: the Taming Power of the Small; the noble person accordingly refines the beauty of their culture and virtue (風行天上，小畜；君子以懿文德).',
      modernDeep: {
        structureInsight:
          'Wind (Xun) over heaven (Qian): the wind can only stir the clouds, not yet make rain — the restraining power is small, enough to gather but not to complete.',
        transformInsight:
          'Reversed, it becomes Treading (#10, walking with care). A single yin line (line 4) strains to hold back five yang lines: a small force reining in a large one, so it can only "tame" a little. Its opposite is Enthusiasm (#16); its nuclear is Opposition (#38).',
        binaryInsight:
          'Value 55, cell (row 6 = Xun, col 7 = Qian) — a single yin line at place 4 among five yang lines.',
        linePositions:
          'Line 4 (yin, correct) is the sole soft "ruler," alone reining in the whole yang mass; because the forces are so unequal, it accumulates only a little. Line 5 (yang, central and correct) lends it support.',
        modernMapping:
          'When your resources or influence are still small, do not plot big things: accumulate bit by bit and refine your "cultural virtue" — soft skills, credibility, relationships.\n\n"Dense clouds, no rain yet": all the conditions are gathering but have not crossed the threshold. Patiently add to them rather than forcing a premature result.',
      },
    },
  },
  10: {
    modernShort:
      'Bước trên đường nguy như giẫm đuôi hổ — cư xử đúng mực, lễ độ và tỉnh táo thì vượt qua.',
    keywords: ['thận trọng', 'đúng mực', 'lễ độ'],
    judgmentClassic:
      'Giẫm lên đuôi cọp mà cọp không cắn, hanh thông (履虎尾，不咥人，亨).',
    imageClassic:
      'Trên là trời, dưới là đầm, là Lý; người quân tử nhân đó phân biệt trên dưới, định yên chí dân (上天下澤，履；君子以辨上下，定民志).',
    modernDeep: {
      structureInsight:
        'Trời (Càn) ở trên, đầm (Đoài) ở dưới: trên dưới rõ ngôi, đầm vui vẻ nương theo trời cứng — tượng cách ứng xử đúng mực giữa mạnh và yếu.',
      transformInsight:
        'Đảo của Tiểu Súc (#9): tích lũy nhỏ (Súc) và bước đi đúng lễ (Lý) bổ cho nhau. Hỗ là Gia Nhân (#37) — lễ và trật tự cùng một gốc. Đối là Khiêm (#15).',
      binaryInsight:
        'Giá trị 59, ô (hàng 7 = Càn, cột 3 = Đoài) — một hào âm (hào 3) mềm bước giữa các hào dương cứng.',
      linePositions:
        'Hào 3 (âm, lệch vị) là hào "giẫm đuôi cọp": mềm yếu mà ở chỗ nguy nên phải cực kỳ cẩn trọng. Hào 5 (dương, trung chính) làm chỗ dựa cho cách bước đúng.',
      modernMapping:
        '"Lý" là cách ta bước đi, cư xử trong tình thế nguy. Giẫm đuôi cọp mà an toàn nhờ thái độ đúng mực, lễ độ, tỉnh táo — không phải nhờ sức mạnh.\n\nỞ môi trường có tôn ti (công ty, xã hội), biết rõ vị trí của mình và cư xử phải phép giúp đi qua chỗ hiểm mà không bị "cắn".',
    },
    en: {
      modernShort:
        'Walking a dangerous path like stepping on a tiger’s tail — behave with propriety, courtesy, and alertness, and you pass through.',
      keywords: ['caution', 'propriety', 'courtesy'],
      judgmentGloss:
        'Treading on the tiger’s tail; it does not bite the person; pervading (履虎尾，不咥人，亨).',
      imageGloss:
        'Heaven above, lake below: Treading; the noble person accordingly distinguishes high and low and settles the will of the people (上天下澤，履；君子以辨上下，定民志).',
      modernDeep: {
        structureInsight:
          'Heaven (Qian) above, lake (Dui) below: clear rank above and below, the joyous lake yielding beneath firm heaven — the image of proper conduct between the strong and the weak.',
        transformInsight:
          'The reversed of the Taming Power of the Small (#9): small accumulation and treading with propriety complement each other. Its nuclear is The Family (#37) — courtesy and order share one root. Its opposite is Modesty (#15).',
        binaryInsight:
          'Value 59, cell (row 7 = Qian, col 3 = Dui) — a single yin line (line 3) treading softly among firm yang lines.',
        linePositions:
          'Line 3 (yin, out of place) is the line "treading on the tiger’s tail": soft and weak in a dangerous spot, so it must be extremely careful. Line 5 (yang, central and correct) is the support for treading rightly.',
        modernMapping:
          '"Lu" is how we walk and conduct ourselves in a dangerous situation. To tread on a tiger’s tail and stay safe comes from proper, courteous, alert conduct — not from force.\n\nIn a hierarchical setting (a company, society), knowing your position clearly and behaving fittingly carries you through danger without being "bitten."',
      },
    },
  },
  11: {
    modernShort:
      'Trời đất giao hoà — giai đoạn thông suốt, mọi thứ ăn khớp; tận dụng nhưng nhớ thịnh rồi sẽ suy.',
    keywords: ['hanh thông', 'hoà hợp', 'thịnh'],
    judgmentClassic:
      'Cái nhỏ ra đi, cái lớn kéo tới; tốt, hanh thông (泰：小往大來，吉亨).',
    imageClassic:
      'Trời đất giao nhau, là Thái; bậc vua nhân đó tài bồi đạo trời đất, giúp cho sự thích nghi của trời đất để nâng đỡ dân (天地交泰，后以財成天地之道，輔相天地之宜，以左右民).',
    modernDeep: {
      structureInsight:
        'Đất ở trên, Trời ở dưới — nghe ngược đời, nhưng chính vì khí dương (Trời) vốn bốc lên gặp khí âm (Đất) giáng xuống, hai bên đi vào nhau mà giao hòa. Đó là cơ chế của "hanh thông".',
      transformInsight:
        'Quẻ đối (đảo toàn bộ bit) trùng đúng với quẻ đảo (lật trên–dưới): cả hai đều ra Bĩ (#12) — bế tắc. Thái và Bĩ là một cặp gương soi nhau, nhắc "thái cực thì bĩ lai".',
      binaryInsight:
        'Giá trị 7 — quẻ dưới là Càn (7), quẻ trên là Khôn (0); ô (hàng 0, cột 7). Trời đứng ở vị trí "quẻ dưới" thay vì trên cùng: chính sự đảo chỗ đó tạo nên giao hòa.',
      linePositions:
        'Đặc biệt nhất: cả ba cặp ứng (1–4, 2–5, 3–6) đều một âm một dương → trên dưới hoàn toàn giao cảm, đúng tượng "giao thái". Rất ít quẻ đạt được sự ứng trọn vẹn này.',
      modernMapping:
        'Thời mọi mắt xích ăn khớp: trên dưới thông nhau, hợp tác thuận, việc gì cũng trôi. Nên tận dụng để làm việc lớn, kết nối, mở rộng.\n\nNhưng cấu trúc đã báo trước: đối/đảo của Thái là Bĩ. Đỉnh thịnh cũng là lúc mầm suy nhú lên (hào 6 "thành quách đổ xuống hào"). Khôn ngoan là giữ đà giao hòa bằng cách không tự mãn.',
    },
    en: {
      modernShort:
        'Heaven and earth in harmony — a time of free flow when everything meshes; use it, but remember that fullness turns to decline.',
      keywords: ['pervasion', 'harmony', 'flourishing'],
      judgmentGloss:
        'The small departs, the great arrives; good fortune, pervading (小往大來，吉亨).',
      imageGloss:
        'Heaven and earth unite: Peace; the ruler accordingly shapes the way of heaven and earth, aiding what is fitting, to support the people (天地交泰…以左右民).',
      modernDeep: {
        structureInsight:
          'Earth above, Heaven below — it sounds upside down, but precisely because yang (Heaven) naturally rises to meet yin (Earth) descending, the two move into each other and harmonize. This is the mechanism of "free flow."',
        transformInsight:
          'Its opposite (all bits flipped) coincides exactly with its reversed (upper–lower flipped): both yield Standstill (#12) — blockage. Peace and Standstill are a mirror pair, a reminder that "at the height of peace, standstill comes."',
        binaryInsight:
          'Value 7 — the lower trigram is Qian (7), the upper is Kun (0); cell (row 0, col 7). Heaven stands in the "lower" place rather than at the top: that very swap creates the harmony.',
        linePositions:
          'Most remarkable: all three resonant pairs (1–4, 2–5, 3–6) are one yin and one yang → upper and lower fully commune, the very image of "harmonious peace." Very few hexagrams achieve this complete resonance.',
        modernMapping:
          'A time when every link meshes: high and low communicate, cooperation flows, everything moves. Use it for big undertakings, connecting, expanding.\n\nBut the structure warns in advance: the opposite/reversed of Peace is Standstill. The peak of flourishing is also when the sprout of decline appears (line 6, "the wall falls back into the moat"). Wisdom is to sustain the harmony by not growing complacent.',
      },
    },
  },
  12: {
    modernShort:
      'Trên dưới không thông — thời bế tắc; người vững vàng thu mình giữ mình, chờ khí vận đổi chiều.',
    keywords: ['bế tắc', 'thu mình', 'chờ đổi'],
    judgmentClassic:
      'Bế tắc do kẻ xấu; không lợi cho sự giữ chính của người quân tử; cái lớn ra đi, cái nhỏ kéo tới (否之匪人，不利君子貞，大往小來).',
    imageClassic:
      'Trời đất không giao nhau, là Bĩ; người quân tử nhân đó kiệm đức tránh nạn, không cầu vinh hoa bổng lộc (天地不交，否；君子以儉德辟難，不可榮以祿).',
    modernDeep: {
      structureInsight:
        'Trời (Càn) ở trên cứ bốc lên, đất (Khôn) ở dưới cứ chìm xuống — hai bên rời nhau, khí không giao. Ngược hẳn Thái: cùng hai quẻ đơn ấy nhưng đảo chỗ thì thành bế tắc.',
      transformInsight:
        'Quẻ đối và quẻ đảo đều là Thái (#11): Bĩ–Thái là cặp gương, thịnh–suy nối nhau. Hỗ là Tiệm (#53) — gợi lối ra khỏi bế tắc là tiến từ từ, không cưỡng ép.',
      binaryInsight:
        'Giá trị 56, ô (hàng 7 = Càn, cột 0 = Khôn) — Trời trên Đất dưới "đúng chỗ" về vật lý, nhưng chính sự đúng-chỗ tách rời đó lại là bế tắc.',
      linePositions:
        'Nghịch lý: hào 2 và hào 5 đều trung chính, cả ba cặp đều có ứng — cấu trúc hào "đẹp" mà quẻ vẫn bĩ, vì hai khối âm/dương tách bạch không chịu hòa. Nhắc rằng đủ điều kiện hình thức chưa chắc đã thông.',
      modernMapping:
        'Thời bế tắc: trên dưới không thông, nói chẳng tới nhau, nỗ lực như rơi vào khoảng không.\n\nLời cổ rất thực: thu mình, "kiệm đức tránh nạn", không phô trương cầu lợi. Bĩ không kéo dài mãi — giữ mình qua giai đoạn này để đón lúc khí vận đảo chiều (Bĩ cực thì Thái lai).',
    },
    en: {
      modernShort:
        'High and low do not communicate — a time of blockage; the steady withdraw and keep themselves, awaiting the tide to turn.',
      keywords: ['blockage', 'withdrawal', 'awaiting change'],
      judgmentGloss:
        'Standstill through the wrong people; it does not further the noble person’s perseverance; the great departs, the small arrives (否之匪人，不利君子貞，大往小來).',
      imageGloss:
        'Heaven and earth do not unite: Standstill; the noble person accordingly restrains their virtue and avoids trouble, seeking no honor or salary (天地不交，否；君子以儉德辟難).',
      modernDeep: {
        structureInsight:
          'Heaven (Qian) above keeps rising, earth (Kun) below keeps sinking — the two part, their forces not meeting. The exact opposite of Peace: the same two trigrams, but swapped, become blockage.',
        transformInsight:
          'Both its opposite and its reversed are Peace (#11): Standstill and Peace are a mirror pair, flourishing and decline following each other. Its nuclear is Development (#53) — suggesting the way out of blockage is to advance gradually, not by force.',
        binaryInsight:
          'Value 56, cell (row 7 = Qian, col 0 = Kun) — Heaven above, Earth below, "physically correct," yet that very correct-but-separate placement is the blockage.',
        linePositions:
          'A paradox: lines 2 and 5 are both central and correct, and all three pairs resonate — a "beautiful" line structure, yet the hexagram is still blocked, because the two yin/yang blocks stand apart and refuse to blend. A reminder that meeting the formal conditions does not guarantee flow.',
        modernMapping:
          'A time of blockage: high and low do not communicate, words do not reach, effort seems to fall into a void.\n\nThe classic is very practical: withdraw, "restrain your virtue and avoid trouble," do not flaunt or seek gain. Standstill does not last forever — keep yourself through this phase to catch the turning of the tide (at the height of standstill, peace returns).',
      },
    },
  },
  13: {
    modernShort:
      'Hợp quần với người cùng chí — cởi mở, công tâm và vượt phe nhóm thì việc lớn thành.',
    keywords: ['đồng lòng', 'cộng tác', 'công tâm'],
    judgmentClassic:
      'Cùng người nơi đồng nội (rộng mở, công khai), hanh thông; lợi vượt sông lớn, lợi về sự giữ chính của người quân tử (同人于野，亨。利涉大川，利君子貞).',
    imageClassic:
      'Trời và lửa (cùng bốc lên), là Đồng Nhân; người quân tử nhân đó phân loại giống nòi, biện biệt sự vật (天與火，同人；君子以類族辨物).',
    modernDeep: {
      structureInsight:
        'Trời (Càn) ở trên, lửa (Ly) ở dưới hướng lên gặp trời — cùng một chí hướng đi lên. Tượng người hợp quần vì cùng lý tưởng.',
      transformInsight:
        'Đảo thành Đại Hữu (#14): "đồng lòng với người" và "sở hữu lớn" là hai mặt — hợp quần thì thành nghiệp lớn. Đối là Sư (#7), hỗ là Cấu (#44).',
      binaryInsight:
        'Giá trị 61, ô (hàng 7 = Càn, cột 5 = Ly) — một hào âm duy nhất (hào 2) giữa năm hào dương.',
      linePositions:
        'Hào 2 (âm, trung chính ở dưới) ứng với hào 5 (dương, trung chính ở trên): hai trung chính ứng nhau là trục "đồng lòng". Nhưng một âm giữa năm dương cũng dễ thành tranh giành — nên phải "đồng nơi đồng nội", công khai chứ không bè phái.',
      modernMapping:
        'Hợp quần với người cùng chí hướng. Sức cộng tác đến khi mục tiêu công khai, minh bạch ("nơi đồng nội"), không phải kết bè kín.\n\n"Phân loại, biện biệt sự vật": cộng tác tốt cần hiểu rõ ai hợp với việc gì — dị biệt mà vẫn cùng hướng, chứ không gom bừa rồi đồng phục hóa.',
    },
    en: {
      modernShort:
        'Uniting with those who share your aim — open, fair-minded, and beyond faction, and great things succeed.',
      keywords: ['common purpose', 'cooperation', 'fairness'],
      judgmentGloss:
        'Fellowship with people in the open field (broad and public), pervading; it furthers to cross the great water, it furthers the noble person’s perseverance (同人于野，亨…利君子貞).',
      imageGloss:
        'Heaven and fire, both rising: Fellowship with Men; the noble person accordingly sorts the clans and distinguishes things (天與火，同人；君子以類族辨物).',
      modernDeep: {
        structureInsight:
          'Heaven (Qian) above, fire (Li) below rising to meet it — a single upward aim. The image of people uniting for a shared ideal.',
        transformInsight:
          'Reversed, it becomes Possession in Great Measure (#14): "fellowship with people" and "great possession" are two faces — unite and you achieve a great enterprise. Its opposite is the Army (#7); its nuclear is Coming to Meet (#44).',
        binaryInsight:
          'Value 61, cell (row 7 = Qian, col 5 = Li) — a single yin line (line 2) among five yang lines.',
        linePositions:
          'Line 2 (yin, central and correct below) resonates with line 5 (yang, central and correct above): two central-and-correct lines resonating form the axis of "shared purpose." But one yin among five yang easily breeds rivalry — hence "fellowship in the open field," public rather than factional.',
        modernMapping:
          'Uniting with those who share your direction. Cooperative strength comes when the aim is open and transparent ("in the open field"), not a closed clique.\n\n"Sort the clans, distinguish things": good cooperation needs a clear sense of who fits what — difference within a shared direction, not a lumped-together uniformity.',
      },
    },
  },
  14: {
    modernShort:
      'Nắm trong tay nhiều — giàu nguồn lực và uy tín; giữ khiêm tốn và chia sẻ để bền lâu.',
    keywords: ['sở hữu lớn', 'thịnh vượng', 'khiêm'],
    judgmentClassic:
      'Sở hữu lớn; rất hanh thông (大有：元亨).',
    imageClassic:
      'Lửa ở trên trời (chiếu khắp), là Đại Hữu; người quân tử nhân đó ngăn điều ác, nêu điều thiện, thuận theo mệnh tốt lành của trời (火在天上，大有；君子以遏惡揚善，順天休命).',
    modernDeep: {
      structureInsight:
        'Lửa (Ly) ở trên trời (Càn): mặt trời treo giữa trời, soi tỏ và bao quát tất cả — tượng nắm giữ nhiều, sáng và rộng.',
      transformInsight:
        'Đảo của Đồng Nhân (#13): đồng lòng dẫn đến sở hữu lớn. Hỗ là Quải (#43, quyết đoán dứt điểm) — của lớn cần biết loại trừ cái xấu kịp thời. Đối là Tỷ (#8).',
      binaryInsight:
        'Giá trị 47, ô (hàng 5 = Ly, cột 7 = Càn) — một hào âm duy nhất (hào 5) làm chủ năm hào dương.',
      linePositions:
        'Hào 5 (âm) ở vị tôn, mềm mà ngự được cả năm hào dương cứng nhờ đắc trung và được các hào ứng theo: tượng người đức khiêm nhu giữ của lớn — cậy sự sáng và lòng tin, không cậy sức.',
      modernMapping:
        'Khi nắm nhiều nguồn lực và uy tín: thời thịnh vượng, bao quát. Nhưng quẻ nhấn vào cách GIỮ: "ngăn ác, nêu thiện".\n\nGiàu/mạnh bền không nhờ ôm chặt, mà nhờ sáng suốt phân định đúng–sai và rộng lượng chia sẻ. Một hào mềm ngự được khối cứng là nhờ đức, không nhờ áp chế.',
    },
    en: {
      modernShort:
        'Holding much in hand — rich in resources and standing; keep humble and share to make it last.',
      keywords: ['great possession', 'abundance', 'humility'],
      judgmentGloss:
        'Possession in Great Measure; supremely pervading (大有：元亨).',
      imageGloss:
        'Fire high in heaven, shining over all: Possession in Great Measure; the noble person accordingly curbs evil and promotes good, obeying the benign will of heaven (火在天上…順天休命).',
      modernDeep: {
        structureInsight:
          'Fire (Li) high in heaven (Qian): the sun hung in the sky, illuminating and encompassing all — the image of holding much, bright and broad.',
        transformInsight:
          'The reversed of Fellowship with Men (#13): shared purpose leads to great possession. Its nuclear is Break-through (#43, decisive resolve) — great wealth must know how to cut off evil in time. Its opposite is Holding Together (#8).',
        binaryInsight:
          'Value 47, cell (row 5 = Li, col 7 = Qian) — a single yin line (line 5) mastering five yang lines.',
        linePositions:
          'Line 5 (yin) in the honored place, soft yet ruling all five firm yang lines by being central and having them respond to it: the image of one with humble, yielding virtue holding great possession — relying on brightness and trust, not force.',
        modernMapping:
          'When you hold much in resources and standing: a time of abundance and reach. But the hexagram stresses HOW to keep it: "curb evil, promote good."\n\nWealth or strength endures not by clutching, but by clear-sighted judgment of right and wrong and generous sharing. One soft line masters a firm mass by virtue, not by force.',
      },
    },
  },
  15: {
    modernShort:
      'Khiêm hạ là sức mạnh — càng cao càng cúi mình, được người nể và việc thuận.',
    keywords: ['khiêm nhường', 'điềm đạm', 'bền'],
    judgmentClassic:
      'Hanh thông; người quân tử giữ được đến cùng (謙：亨，君子有終).',
    imageClassic:
      'Trong lòng đất có núi (núi cao mà ẩn dưới đất), là Khiêm; người quân tử nhân đó bớt chỗ nhiều bù chỗ ít, cân nhắc mà chia cho đều (地中有山，謙；君子以裒多益寡，稱物平施).',
    modernDeep: {
      structureInsight:
        'Núi (Cấn) — vật cao nhất — lại nằm DƯỚI đất (Khôn): cái cao tự đặt mình thấp xuống. Đó chính là tượng của khiêm nhường.',
      transformInsight:
        'Đảo thành Dự (#16): nén mình khiêm hạ (Khiêm) rồi bung ra phấn chấn (Dự) là hai nhịp nối nhau. Hỗ là Giải (#40), đối là Lý (#10).',
      binaryInsight:
        'Giá trị 4, ô (hàng 0 = Khôn, cột 4 = Cấn) — chỉ một hào dương (hào 3) ẩn thấp giữa các hào âm.',
      linePositions:
        'Hào 3 (dương, đắc chính) là hào "chủ": người có thực lực (dương) nhưng đặt mình ở vị thấp, lao tác mà khiêm — nên "có chung" (giữ được tới cùng). Hào 2 đắc trung phụ họa.',
      modernMapping:
        'Khiêm không phải tự hạ thấp giả tạo, mà là cái cao biết cúi: càng nhiều thực lực càng nhún mình. Đây là sức mạnh bền nhất — Khiêm nổi tiếng là quẻ mà cả sáu hào đều lành.\n\n"Bớt nhiều bù ít, chia cho đều": người khiêm thực sự còn chủ động san sẻ, nên được người nể và việc thuận lâu dài.',
    },
    en: {
      modernShort:
        'Humility is strength — the higher you rise, the lower you bow; you win respect and things go smoothly.',
      keywords: ['modesty', 'composure', 'endurance'],
      judgmentGloss:
        'Pervading; the noble person carries it through to the end (亨，君子有終).',
      imageGloss:
        'Within the earth there is a mountain: Modesty; the noble person accordingly reduces the much and adds to the little, weighing things to distribute them evenly (地中有山，謙…稱物平施).',
      modernDeep: {
        structureInsight:
          'The Mountain (Gen) — the highest thing — lies BENEATH the earth (Kun): the high placing itself low. That is the very image of humility.',
        transformInsight:
          'Reversed, it becomes Enthusiasm (#16): compressing oneself in humility (Modesty) then bursting into elation (Enthusiasm) are two beats in sequence. Its nuclear is Deliverance (#40); its opposite is Treading (#10).',
        binaryInsight:
          'Value 4, cell (row 0 = Kun, col 4 = Gen) — a single yang line (line 3) hidden low among yin lines.',
        linePositions:
          'Line 3 (yang, correct) is the "ruling" line: one with real strength (yang) who places themselves in a low position, toiling yet humble — hence "carries it to the end." Line 2, central, supports it.',
        modernMapping:
          'Modesty is not fake self-lowering, but the high knowing how to bow: the more real strength, the more one yields. This is the most durable strength — Modesty is famous as the hexagram whose all six lines are auspicious.\n\n"Reduce the much, add to the little, distribute evenly": the truly humble also actively share, and so win lasting respect and smooth going.',
      },
    },
  },
  16: {
    modernShort:
      'Năng lượng phấn chấn lan toả — chuẩn bị kỹ rồi khơi cảm hứng tập thể, nhưng chớ say sưa quá đà.',
    keywords: ['hứng khởi', 'truyền cảm hứng', 'chuẩn bị'],
    judgmentClassic:
      'Hứng khởi; lợi về dựng nước phong hầu và dấy quân (豫：利建侯行師).',
    imageClassic:
      'Sấm nổ vang khỏi mặt đất, phấn chấn, là Dự; các tiên vương nhân đó làm nhạc tôn sùng đức, long trọng dâng lên Thượng Đế, phối cùng tổ tiên (雷出地奮，豫；先王以作樂崇德，殷薦之上帝，以配祖考).',
    modernDeep: {
      structureInsight:
        'Sấm (Chấn) bật lên khỏi đất (Khôn): khí dồn nén bấy lâu vỡ òa thành tiếng vang — tượng niềm hứng khởi, khí thế dâng lên và lan ra.',
      transformInsight:
        'Đảo của Khiêm (#15): nén mình (Khiêm) rồi bung ra phấn chấn (Dự). Hỗ là Kiển (#39) — nhắc rằng hứng khởi quá đà dễ vấp trắc trở. Đối là Tiểu Súc (#9).',
      binaryInsight:
        'Giá trị 8, ô (hàng 1 = Chấn, cột 0 = Khôn) — một hào dương duy nhất (hào 4) làm cả khối âm chuyển động.',
      linePositions:
        'Hào 4 (dương) là hào "chủ" duy nhất, gây hứng khởi cho cả quẻ, ứng với hào sơ. Hào 2 (âm, trung chính) giữ sự điềm tĩnh — đối trọng để hứng khởi không hóa buông tuồng.',
      modernMapping:
        'Năng lượng phấn chấn có sức tập hợp lớn: âm nhạc, lễ hội, khí thế chung đều khơi từ đây. Hợp để truyền cảm hứng, phát động phong trào.\n\nNhưng cảnh báo nằm sẵn: vui quá hóa mê. Hứng khởi cần được chuẩn bị kỹ và có điểm dừng, kẻo "dự" thành phóng túng.',
    },
    en: {
      modernShort:
        'Uplifting energy spreads — prepare well, then kindle collective inspiration, but do not lose yourself in excess.',
      keywords: ['enthusiasm', 'inspiration', 'preparation'],
      judgmentGloss:
        'Enthusiasm; it furthers to install helpers and set armies marching (豫：利建侯行師).',
      imageGloss:
        'Thunder bursts out of the earth, rousing: Enthusiasm; the ancient kings accordingly made music to honor virtue, offering it in splendor to the Supreme, matched with the ancestors (雷出地奮…以配祖考).',
      modernDeep: {
        structureInsight:
          'Thunder (Zhen) bursts up out of the earth (Kun): energy long pent up breaks into a resounding roar — the image of inspiration, momentum rising and spreading.',
        transformInsight:
          'The reversed of Modesty (#15): compressing oneself (Modesty) then bursting into elation (Enthusiasm). Its nuclear is Obstruction (#39) — a reminder that excess enthusiasm easily stumbles. Its opposite is the Taming Power of the Small (#9).',
        binaryInsight:
          'Value 8, cell (row 1 = Zhen, col 0 = Kun) — a single yang line (line 4) that sets the whole yin mass in motion.',
        linePositions:
          'Line 4 (yang) is the sole "ruling" line, rousing enthusiasm for the whole hexagram, resonating with the bottom line. Line 2 (yin, central and correct) keeps composure — the counterweight so that enthusiasm does not slacken into dissipation.',
        modernMapping:
          'Uplifting energy has great gathering power: music, festivity, shared momentum all spring from here. Good for inspiring, launching a movement.\n\nBut the warning is built in: joy overdone turns to intoxication. Enthusiasm needs careful preparation and a stopping point, lest "enthusiasm" become dissipation.',
      },
    },
  },
  17: {
    modernShort:
      'Đi theo dòng chảy đúng — linh hoạt thích ứng, theo người xứng đáng và được người theo lại.',
    keywords: ['thuận theo', 'thích ứng', 'tin cậy'],
    judgmentClassic:
      'Thuận theo; rất hanh thông, lợi về giữ chính, không lỗi (隨：元亨，利貞，无咎).',
    imageClassic:
      'Trong đầm có sấm (sấm lặng nghỉ trong đầm), là Tùy; người quân tử nhân đó lúc trời tối thì vào nghỉ ngơi (澤中有雷，隨；君子以嚮晦入宴息).',
    modernDeep: {
      structureInsight:
        'Đầm (Đoài, vui) ở trên, sấm (Chấn, động) ở dưới: sức động chịu nép dưới sự vui hòa — tượng thuận theo, cái mạnh biết đi theo hoàn cảnh.',
      transformInsight:
        'Quẻ đối và quẻ đảo đều là Cổ (#18): thuận theo (Tùy) và cái mục cần sửa (Cổ) là cặp gương — theo mù quáng thì sinh hư hỏng, nên "theo" phải kèm "giữ chính". Hỗ là Tiệm (#53).',
      binaryInsight:
        'Giá trị 25, ô (hàng 3 = Đoài, cột 1 = Chấn).',
      linePositions:
        'Hào 5 (dương, trung chính) là đối tượng đáng để theo; hào sơ (dương) chủ động "theo" đúng người. Theo ở đây là chọn lọc — theo cái xứng đáng, không theo bừa.',
      modernMapping:
        'Thuận theo đúng cách: linh hoạt thích ứng với hoàn cảnh, đi theo người/điều xứng đáng — rồi chính mình cũng được người theo lại.\n\nHình ảnh "tối thì vào nghỉ" rất tinh tế: thuận theo cả nhịp tự nhiên làm–nghỉ, không cưỡng. Nhưng "lợi trinh": theo mà vẫn giữ nguyên tắc, đó mới là theo lành.',
    },
    en: {
      modernShort:
        'Following the right current — adapt flexibly, follow the worthy, and be followed in turn.',
      keywords: ['following', 'adapting', 'trust'],
      judgmentGloss:
        'Following; supremely pervading, furthering through perseverance, no blame (隨：元亨，利貞，无咎).',
      imageGloss:
        'Within the lake there is thunder (thunder at rest in the lake): Following; the noble person accordingly goes in to rest at nightfall (澤中有雷，隨；君子以嚮晦入宴息).',
      modernDeep: {
        structureInsight:
          'Lake (Dui, joy) above, thunder (Zhen, motion) below: active force yielding beneath joyous harmony — the image of following, strength that knows how to go with the situation.',
        transformInsight:
          'Both its opposite and its reversed are Work on the Decayed (#18): following (Sui) and the decay that needs mending (Gu) are a mirror pair — blind following breeds rot, so "following" must go with "holding to the correct." Its nuclear is Development (#53).',
        binaryInsight:
          'Value 25, cell (row 3 = Dui, col 1 = Zhen).',
        linePositions:
          'Line 5 (yang, central and correct) is the worthy object to follow; the bottom line (yang) actively "follows" the right person. Following here is selective — following the worthy, not following blindly.',
        modernMapping:
          'Following done right: adapt flexibly to the situation, follow the worthy person or path — and then be followed in turn.\n\nThe image "rest at nightfall" is subtle: follow even the natural rhythm of work and rest, unforced. But "furthering through perseverance": to follow while keeping your principles is what makes following wholesome.',
      },
    },
  },
  18: {
    modernShort:
      'Dọn dẹp cái mục ruỗng — can đảm chỉnh sửa sai lầm tích tụ để khởi sự lại lành mạnh.',
    keywords: ['sửa chữa', 'cải tổ', 'phục hồi'],
    judgmentClassic:
      'Rất hanh thông, lợi vượt sông lớn; lo liệu ba ngày trước ngày Giáp, ba ngày sau ngày Giáp (蠱：元亨，利涉大川，先甲三日，後甲三日).',
    imageClassic:
      'Dưới núi có gió (gió quẩn dưới núi làm vật hư hoại), là Cổ; người quân tử nhân đó chấn hưng dân chúng, nuôi dưỡng đức (山下有風，蠱；君子以振民育德).',
    modernDeep: {
      structureInsight:
        'Núi (Cấn, dừng) ở trên, gió (Tốn) quẩn ở dưới: gió bị núi chặn, ứ đọng sinh hư mục — "cổ" là chuyện đã rữa nát, cần ra tay chỉnh đốn.',
      transformInsight:
        'Quẻ đối và quẻ đảo đều là Tùy (#17): cái "theo" buông xuôi tích lại thành hư hỏng (Cổ); sửa Cổ chính là chấm dứt cái theo sai. Hỗ là Quy Muội (#54).',
      binaryInsight:
        'Giá trị 38, ô (hàng 4 = Cấn, cột 6 = Tốn).',
      linePositions:
        'Hào 2 và hào 5 ứng nhau (hào 5 ở vị tôn) — trục để chỉnh đốn từ trên xuống. "Ba ngày trước/sau ngày Giáp": sửa cái cũ cần nhìn lại căn nguyên và phòng tái phát, chứ không vá víu.',
      modernMapping:
        'Cổ là khi mọi thứ đã mục ruỗng vì buông lỏng lâu ngày: nợ kỹ thuật, thói quen xấu tích tụ, tổ chức trì trệ.\n\nViệc cần là can đảm chỉnh đốn tận gốc — hiểu vì sao hỏng và phòng cho khỏi lặp lại. Dọn xong cái mục là mở ra khởi sự mới, nên quẻ vẫn "nguyên hanh".',
    },
    en: {
      modernShort:
        'Clearing away decay — the courage to fix accumulated faults so a healthy start can begin again.',
      keywords: ['repair', 'reform', 'restoration'],
      judgmentGloss:
        'Supremely pervading, furthering to cross the great water; three days before the day Jia, three days after (蠱：元亨，利涉大川，先甲三日，後甲三日).',
      imageGloss:
        'Below the mountain there is wind (spoiling things): Work on the Decayed; the noble person accordingly rouses the people and nurtures virtue (山下有風，蠱；君子以振民育德).',
      modernDeep: {
        structureInsight:
          'Mountain (Gen, stopping) above, wind (Xun) swirling below: wind blocked by the mountain stagnates and breeds decay — "Gu" is what has rotted, calling for a hand to set it right.',
        transformInsight:
          'Both its opposite and its reversed are Following (#17): slack "following" accumulated into decay (Gu); mending Gu is ending the wrong following. Its nuclear is The Marrying Maiden (#54).',
        binaryInsight:
          'Value 38, cell (row 4 = Gen, col 6 = Xun).',
        linePositions:
          'Lines 2 and 5 resonate (line 5 in the honored place) — the axis for setting things right from the top down. "Three days before and after Jia": fixing the old requires looking to the root cause and guarding against relapse, not a patch-up.',
        modernMapping:
          'Gu is when everything has rotted from long neglect: technical debt, accumulated bad habits, a stagnant organization.\n\nWhat is needed is the courage to reform at the root — understand why it failed and prevent recurrence. Clearing the rot opens a fresh start, so the hexagram is still "supremely pervading."',
      },
    },
  },
  19: {
    modernShort:
      'Dương khí dâng, cơ hội đến gần — chủ động tiếp cận với thiện chí, nhưng nhớ thịnh có hạn kỳ.',
    keywords: ['tiến đến', 'cơ hội', 'chủ động'],
    judgmentClassic:
      'Rất hanh thông, lợi về giữ chính; đến tháng tám thì có điều xấu (臨：元亨，利貞，至于八月有凶).',
    imageClassic:
      'Trên đầm có đất (bờ đất nhìn xuống đầm), là Lâm; người quân tử nhân đó dạy dỗ không cùng, dung chứa bảo bọc dân không bờ bến (澤上有地，臨；君子以教思无窮，容保民无疆).',
    modernDeep: {
      structureInsight:
        'Đất (Khôn) ở trên, đầm (Đoài) ở dưới: bờ đất cao kề sát mặt đầm, như người trên cúi gần kẻ dưới — "lâm" là tới gần để giám sát mà chăm lo.',
      transformInsight:
        'Đảo thành Quán (#20): tới gần nhìn xuống (Lâm) và lùi xa chiêm ngưỡng (Quán) là hai chiều của quan sát–dẫn dắt. Đối là Độn (#33), hỗ là Phục (#24).',
      binaryInsight:
        'Giá trị 3, ô (hàng 0 = Khôn, cột 3 = Đoài) — hai hào dương mới mọc ở đáy, khí dương đang lên (Lâm thuộc nhóm 12 Tích quái).',
      linePositions:
        'Hào 2 (dương) ứng hào 5 (âm, vị tôn): sức dương đang lên ở dưới được người trên đón nhận. "Đến tháng tám có hung" nhắc: dương thịnh rồi sẽ tới lúc âm trở lại — đà lên có hạn kỳ.',
      modernMapping:
        'Lâm là lúc tới gần để dẫn dắt, kèm cặp, giám sát: sức ảnh hưởng đang lên, cơ hội mở ra. Hợp để chủ động tiếp cận với thiện chí.\n\nHình ảnh đẹp: "dạy dỗ không cùng, bao bọc dân không bờ". Nhưng lời nhắc về thời điểm ("tháng tám có hung") rất thực: đà lên nào cũng có hạn, nên tận dụng khi còn thuận.',
    },
    en: {
      modernShort:
        'Yang rises, opportunity draws near — approach actively with goodwill, but remember flourishing has its season.',
      keywords: ['approach', 'opportunity', 'initiative'],
      judgmentGloss:
        'Supremely pervading, furthering through perseverance; by the eighth month there is misfortune (臨：元亨，利貞，至于八月有凶).',
      imageGloss:
        'Above the lake there is earth: Approach; the noble person accordingly teaches without end, embracing and protecting the people without bound (澤上有地，臨…容保民无疆).',
      modernDeep: {
        structureInsight:
          'Earth (Kun) above, lake (Dui) below: a high earthen bank right up against the water’s surface, like a superior stooping close to those below — "Lin" is drawing near to oversee and care for.',
        transformInsight:
          'Reversed, it becomes Contemplation (#20): approaching to look down (Lin) and standing back to behold (Guan) are two directions of observing and guiding. Its opposite is Retreat (#33); its nuclear is Return (#24).',
        binaryInsight:
          'Value 3, cell (row 0 = Kun, col 3 = Dui) — two yang lines newly grown at the base, yang force rising (Lin is one of the twelve sovereign hexagrams).',
        linePositions:
          'Line 2 (yang) resonates with line 5 (yin, the honored place): rising yang below is welcomed by the one above. "By the eighth month, misfortune" warns: yang at its height will give way to returning yin — the rising has its season.',
        modernMapping:
          'Lin is the moment of drawing near to guide, mentor, oversee: influence is rising, opportunity opening. Good for approaching actively with goodwill.\n\nA fine image: "teaching without end, embracing the people without bound." But the note about timing ("the eighth month brings misfortune") is very real: every rise has its limit, so use it while the tide is with you.',
      },
    },
  },
  20: {
    modernShort:
      'Lùi lại quan sát toàn cảnh — nhìn sâu, làm gương, hiểu quy luật trước khi hành động.',
    keywords: ['quan sát', 'chiêm nghiệm', 'làm gương'],
    judgmentClassic:
      'Đã rửa tay (sửa soạn tế) mà chưa dâng lễ, lòng thành nghiêm trang khiến người ngưỡng vọng (觀：盥而不荐，有孚顒若).',
    imageClassic:
      'Gió đi trên mặt đất (thổi tới khắp nơi), là Quán; các tiên vương nhân đó đi xem xét các phương, quan sát dân để đặt việc dạy dỗ (風行地上，觀；先王以省方，觀民設教).',
    modernDeep: {
      structureInsight:
        'Gió (Tốn) trên đất (Khôn): gió lướt khắp mặt đất, chạm tới mọi nơi — tượng sự quan sát bao quát và sự nêu gương lan tỏa.',
      transformInsight:
        'Đảo của Lâm (#19): tới gần nhìn xuống (Lâm) và đứng xa chiêm ngưỡng (Quán). Hai hào dương nay đã lên đỉnh (hào 5, 6) làm gương cho bốn hào âm dưới ngước nhìn. Hỗ là Bác (#23), đối là Đại Tráng (#34).',
      binaryInsight:
        'Giá trị 48, ô (hàng 6 = Tốn, cột 0 = Khôn) — hai hào dương ở trên cùng, bốn hào âm ngước lên (Quán thuộc 12 Tích quái).',
      linePositions:
        'Hào 5 (dương, trung chính) ở vị tôn là tấm gương để cả quẻ "quán", ứng với hào 2. "Rửa tay mà chưa dâng lễ": cái khiến người kính phục là sự thành kính trang nghiêm, không phải hình thức bày biện.',
      modernMapping:
        'Quán là lùi lại để nhìn toàn cảnh và để làm gương. Trước khi hành động, hãy hiểu quy luật và bối cảnh; với người dẫn dắt, "được nhìn" cũng là một cách giáo hóa.\n\nÝ tinh tế: uy tín đến từ sự chân thành nghiêm cẩn ngay từ khâu chuẩn bị ("rửa tay"), chứ không ở màn trình diễn cuối.',
    },
    en: {
      modernShort:
        'Standing back to survey the whole — look deeply, set an example, grasp the pattern before you act.',
      keywords: ['observation', 'contemplation', 'example'],
      judgmentGloss:
        'The hands are washed but the offering not yet made; sincerity, grave and dignified, inspires reverence (盥而不荐，有孚顒若).',
      imageGloss:
        'Wind moves over the earth: Contemplation; the ancient kings accordingly surveyed the regions, observed the people, and set up their teaching (風行地上，觀…觀民設教).',
      modernDeep: {
        structureInsight:
          'Wind (Xun) over earth (Kun): wind sweeping across all the land, touching everywhere — the image of comprehensive observation and of an example that spreads.',
        transformInsight:
          'The reversed of Approach (#19): approaching to look down (Lin) and standing apart to behold (Guan). The two yang lines have now risen to the top (lines 5, 6) as an example for the four yin below to look up to. Its nuclear is Splitting Apart (#23); its opposite is the Power of the Great (#34).',
        binaryInsight:
          'Value 48, cell (row 6 = Xun, col 0 = Kun) — two yang lines at the very top, four yin looking up (Guan is one of the twelve sovereign hexagrams).',
        linePositions:
          'Line 5 (yang, central and correct) in the honored place is the example the whole hexagram "contemplates," resonating with line 2. "Hands washed but offering not yet made": what inspires reverence is grave sincerity, not the display of ritual.',
        modernMapping:
          'Guan is standing back to see the whole and to set an example. Before acting, understand the pattern and the context; for a leader, "being seen" is itself a form of teaching.\n\nA subtle point: credibility comes from earnest sincerity right from the preparation ("washing the hands"), not from the final performance.',
      },
    },
  },
  21: {
    modernShort:
      'Cắn đứt vật cản giữa hai hàm — dứt khoát xử lý chướng ngại, công bằng và rõ ràng.',
    keywords: ['quyết đoán', 'xử lý', 'công bằng'],
    judgmentClassic:
      'Hanh thông; lợi về dùng hình ngục (噬嗑：亨，利用獄).',
    imageClassic:
      'Sấm và chớp cùng đến, là Phệ Hạp; các tiên vương nhân đó làm sáng hình phạt và chỉnh đốn pháp luật (雷電噬嗑；先王以明罰敕法).',
    modernDeep: {
      structureInsight:
        'Lửa/chớp (Ly) ở trên, sấm (Chấn) ở dưới: sấm chớp cùng phát — uy và sáng đi đôi. Hình quẻ tựa cái miệng (hai hào cứng ngoài cùng là môi) ngậm một vật cản (hào 4 cứng ở giữa), phải cắn cho vỡ.',
      transformInsight:
        'Đảo thành Bí (#22): cắn vỡ trở ngại (Phệ Hạp) và tô điểm hình thức (Bí) là hai mặt — thực chất xử lý so với vẻ ngoài. Hỗ là Kiển (#39), đối là Tỉnh (#48).',
      binaryInsight:
        'Giá trị 41, ô (hàng 5 = Ly, cột 1 = Chấn).',
      linePositions:
        'Hào 4 (dương) là "vật cản" giữa miệng cần cắn đứt. Hào 5 (âm, đắc trung) là người cầm cán cân xử lý: dùng hình phải sáng (Ly) và đúng mức. Quẻ gắn với việc xét xử công minh.',
      modernMapping:
        'Khi có chướng ngại "mắc giữa hàm" — xung đột chưa giải, vấn đề bị né tránh — phải dứt khoát cắn vỡ nó, đừng ngậm mãi.\n\nNhưng "sấm chớp đi đôi": xử lý cần vừa cương quyết (sấm) vừa sáng tỏ, công bằng (chớp). Dứt điểm mà minh bạch, không tùy tiện.',
    },
    en: {
      modernShort:
        'Biting through the obstruction between the jaws — deal decisively with the obstacle, fairly and clearly.',
      keywords: ['decisiveness', 'resolution', 'fairness'],
      judgmentGloss:
        'Pervading; it furthers to administer justice (亨，利用獄).',
      imageGloss:
        'Thunder and lightning come together: Biting Through; the ancient kings accordingly made punishments clear and set the laws in order (雷電噬嗑；先王以明罰敕法).',
      modernDeep: {
        structureInsight:
          'Fire/lightning (Li) above, thunder (Zhen) below: thunder and lightning together — authority and clarity paired. The figure is like a mouth (the firm outer lines are the lips) clamping on an obstruction (the firm line 4 in the middle), which must be bitten through.',
        transformInsight:
          'Reversed, it becomes Grace (#22): biting through the obstacle (Shi Ke) and adorning the form (Bi) are two faces — substance addressed versus appearance. Its nuclear is Obstruction (#39); its opposite is the Well (#48).',
        binaryInsight:
          'Value 41, cell (row 5 = Li, col 1 = Zhen).',
        linePositions:
          'Line 4 (yang) is the "obstruction" in the mouth to be bitten through. Line 5 (yin, central) holds the scales of judgment: punishment must be bright (Li) and measured. The hexagram is tied to fair adjudication.',
        modernMapping:
          'When there is an obstacle "stuck between the jaws" — an unresolved conflict, an avoided problem — you must decisively bite through it, not hold it forever.\n\nBut "thunder and lightning together": dealing with it needs both resolve (thunder) and clarity and fairness (lightning). Settle it, but transparently, not arbitrarily.',
      },
    },
  },
  22: {
    modernShort:
      'Vẻ đẹp tô điểm — hình thức làm rõ nội dung, nhưng đừng để cái đẹp che mất thực chất.',
    keywords: ['hình thức', 'thẩm mỹ', 'tinh tế'],
    judgmentClassic:
      'Hanh thông; lợi nhỏ về chỗ có đi (賁：亨，小利有攸往).',
    imageClassic:
      'Dưới núi có lửa (lửa soi rọi chân núi), là Bí; người quân tử nhân đó làm sáng các việc chính sự, nhưng không dám lấy đó mà xử kiện (山下有火，賁；君子以明庶政，无敢折獄).',
    modernDeep: {
      structureInsight:
        'Núi (Cấn) ở trên, lửa (Ly) ở dưới soi lên: ánh lửa tô sáng dáng núi — tượng sự trang điểm, làm đẹp hình thức cho nội dung.',
      transformInsight:
        'Đảo của Phệ Hạp (#21): hình thức tô điểm (Bí) so với thực chất cắn vỡ (Phệ Hạp). Hỗ là Giải (#40), đối là Khốn (#47).',
      binaryInsight:
        'Giá trị 37, ô (hàng 4 = Cấn, cột 5 = Ly).',
      linePositions:
        'Hào 2 (âm, trung chính) tô điểm cho hào dương kề bên — cái đẹp nương vào cái thực. "Không dám lấy hình thức mà xử kiện": trang sức được phép làm sáng chính sự, nhưng việc hệ trọng phải dựa thực chất.',
      modernMapping:
        'Bí nói về hình thức, thẩm mỹ, thương hiệu: cái đẹp làm rõ và nâng giá trị nội dung. "Lợi nhỏ" — hình thức giúp được, nhưng chỉ ở mức bổ trợ.\n\nLằn ranh quan trọng: đừng để cái đẹp che mất thực chất. Trang trí cho chính sự thì tốt; nhưng quyết định hệ trọng phải căn cứ sự thật, không căn cứ vẻ ngoài.',
    },
    en: {
      modernShort:
        'Adorning beauty — form makes content clear, but do not let beauty obscure substance.',
      keywords: ['form', 'aesthetics', 'refinement'],
      judgmentGloss:
        'Pervading; a small furthering in having somewhere to go (亨，小利有攸往).',
      imageGloss:
        'Below the mountain there is fire: Grace; the noble person accordingly makes the ordinary business of government clear, but dares not decide criminal cases by it (山下有火，賁…无敢折獄).',
      modernDeep: {
        structureInsight:
          'Mountain (Gen) above, fire (Li) below shining up: firelight adorning the mountain’s form — the image of ornament, giving beautiful form to content.',
        transformInsight:
          'The reversed of Biting Through (#21): adorning the form (Bi) versus biting through the substance (Shi Ke). Its nuclear is Deliverance (#40); its opposite is Oppression (#47).',
        binaryInsight:
          'Value 37, cell (row 4 = Gen, col 5 = Li).',
        linePositions:
          'Line 2 (yin, central and correct) adorns the yang line beside it — beauty leaning on substance. "Dare not decide cases by form": ornament may brighten ordinary affairs, but weighty matters must rest on substance.',
        modernMapping:
          'Bi is about form, aesthetics, branding: beauty clarifies and lifts the value of content. "A small furthering" — form helps, but only as support.\n\nThe crucial line: do not let beauty obscure substance. Adorning ordinary affairs is fine; but weighty decisions must rest on truth, not appearance.',
      },
    },
  },
  23: {
    modernShort:
      'Cái xấu gặm dần từ trên — thời suy bại, giữ mình, không cố chống, chờ đáy để bật lại.',
    keywords: ['bào mòn', 'suy', 'giữ mình'],
    judgmentClassic:
      'Không lợi về chỗ có đi (剝：不利有攸往).',
    imageClassic:
      'Núi nương trên đất (sắp lở xuống), là Bác; người trên nhân đó làm dày phần dưới để yên chỗ ở (山附於地，剝；上以厚下安宅).',
    modernDeep: {
      structureInsight:
        'Núi (Cấn) đặt trên đất (Khôn): năm hào âm đã gặm từ dưới lên, chỉ còn một hào dương trên chót vót sắp đổ — tượng cái xấu bào mòn dần, thời suy bại.',
      transformInsight:
        'Đảo thành Phục (#24): bào mòn tới đáy (Bác) thì một dương trở lại (Phục) — suy cực thì sinh. Đối là Quải (#43, năm dương đẩy một âm — ảnh gương của Bác). Hỗ là Khôn (#2).',
      binaryInsight:
        'Giá trị 32, ô (hàng 4 = Cấn, cột 0 = Khôn) — chỉ còn một hào dương ở đỉnh (hào 6), năm hào âm dưới (Bác thuộc 12 Tích quái).',
      linePositions:
        'Hào 6 (dương) đơn độc trên đỉnh, dưới bị năm âm gặm — "quả dương" sắp rụng. Thế suy đã định, gắng chống lại chỉ phí sức.',
      modernMapping:
        'Bác là thời suy bại, cái xấu gặm dần từ trong ra: đừng cố "có chỗ đi", đừng khởi sự lớn.\n\nKhôn ngoan là giữ mình và "làm dày phần dưới" — củng cố nền tảng, bảo toàn lực lượng, chờ đáy. Vì ngay sau Bác là Phục: chạm đáy rồi sẽ bật lại.',
    },
    en: {
      modernShort:
        'Evil gnawing from above — a time of decline; keep yourself, do not force resistance, wait for the bottom to rebound.',
      keywords: ['erosion', 'decline', 'self-preservation'],
      judgmentGloss:
        'It does not further to have somewhere to go (剝：不利有攸往).',
      imageGloss:
        'The mountain rests on the earth (about to slide down): Splitting Apart; the superior accordingly makes the base generous to secure his dwelling (山附於地，剝；上以厚下安宅).',
      modernDeep: {
        structureInsight:
          'Mountain (Gen) set on earth (Kun): five yin lines have gnawed upward from below, leaving one yang line at the very top about to fall — the image of evil eroding bit by bit, a time of decline.',
        transformInsight:
          'Reversed, it becomes Return (#24): eroded to the bottom (Bo), one yang returns (Fu) — decline at its extreme gives birth. Its opposite is Break-through (#43, five yang pushing out one yin — the mirror of Bo). Its nuclear is Earth (#2).',
        binaryInsight:
          'Value 32, cell (row 4 = Gen, col 0 = Kun) — only one yang line left at the top (line 6), five yin below (Bo is one of the twelve sovereign hexagrams).',
        linePositions:
          'Line 6 (yang) alone at the top, gnawed by five yin below — the "last fruit" about to drop. Decline is set; struggling against it only wastes strength.',
        modernMapping:
          'Bo is a time of decline, evil gnawing from within outward: do not seek to "have somewhere to go," do not launch big ventures.\n\nWisdom is to keep yourself and "make the base generous" — shore up the foundation, preserve your strength, wait for the bottom. For right after Bo comes Fu: touch bottom and it rebounds.',
      },
    },
  },
  24: {
    modernShort:
      'Một tia dương trở lại sau cùng cực — bước ngoặt phục hồi, khởi đầu chu kỳ mới từ điểm thấp nhất.',
    keywords: ['quay về', 'phục hồi', 'chu kỳ mới'],
    judgmentClassic:
      'Hanh thông. Ra vào không bệnh tật, bạn đến không lỗi; trở lại theo đạo của nó, bảy ngày thì quay về, lợi về chỗ có đi (復：亨。出入无疾，朋來无咎。反復其道，七日來復，利有攸往).',
    imageClassic:
      'Sấm ở trong lòng đất, là Phục; các tiên vương nhân đó ngày Đông chí thì đóng cửa ải, khách buôn không đi, vua không đi xét các phương (雷在地中，復；先王以至日閉關，商旅不行，后不省方).',
    modernDeep: {
      structureInsight:
        'Đất (Khôn) ở trên, sấm (Chấn) ở dưới: một hào dương vừa trở lại ở đáy sau khi âm cực — tia sống đầu tiên nhen lại. Đây là quẻ Đông chí, gốc của chu kỳ mới.',
      transformInsight:
        'Đảo của Bác (#23): bào mòn tới cùng (Bác) thì dương phục hồi (Phục). Đối là Cấu (#44, một âm mới sinh — ảnh gương của Phục). Hỗ là Khôn (#2).',
      binaryInsight:
        'Giá trị 1, ô (hàng 0 = Khôn, cột 1 = Chấn) — đúng một hào dương ở đáy (bit thấp nhất bật), khởi điểm đếm lên. Phục = Đông chí trong 12 Tích quái.',
      linePositions:
        'Chỉ một hào dương ở vị sơ (đắc chính) là mầm sống vừa nhú; hào 2 đắc trung che chở nó. "Bảy ngày quay về": chu kỳ có nhịp, hồi phục là quy luật chứ không ngẫu nhiên.',
      modernMapping:
        'Phục là bước ngoặt phục hồi từ điểm thấp nhất: một tia dương trở lại sau cùng cực. Khởi đầu của chu kỳ mới.\n\nLời khuyên rất thực: lúc mầm còn non thì "đóng cửa nghỉ ngơi" — đừng vội bung, hãy bảo vệ và nuôi cái mới chớm. Hồi phục cần thời gian và sự tĩnh dưỡng.',
    },
    en: {
      modernShort:
        'A single ray of yang returns after the extreme — the turning point of recovery, a new cycle beginning from the lowest point.',
      keywords: ['return', 'recovery', 'new cycle'],
      judgmentGloss:
        'Pervading. Going out and coming in without harm; friends come without blame. Returning by its own path, in seven days it comes back; it furthers to have somewhere to go (亨…七日來復，利有攸往).',
      imageGloss:
        'Thunder within the earth: Return; the ancient kings accordingly closed the passes at the solstice, merchants did not travel, and the ruler did not tour the regions (雷在地中，復…后不省方).',
      modernDeep: {
        structureInsight:
          'Earth (Kun) above, thunder (Zhen) below: a single yang line has just returned at the base after yin reached its extreme — the first spark of life rekindled. This is the winter-solstice hexagram, the root of the new cycle.',
        transformInsight:
          'The reversed of Splitting Apart (#23): eroded to the utmost (Bo), yang recovers (Fu). Its opposite is Coming to Meet (#44, one yin newly born — the mirror of Fu). Its nuclear is Earth (#2).',
        binaryInsight:
          'Value 1, cell (row 0 = Kun, col 1 = Zhen) — exactly one yang line at the base (the lowest bit on), the starting point of the count up. Fu = winter solstice among the twelve sovereign hexagrams.',
        linePositions:
          'Just one yang line at the bottom place (correct) is the newly sprouting life; line 2, central, shelters it. "In seven days it comes back": the cycle has its rhythm — recovery is a law, not chance.',
        modernMapping:
          'Fu is the turning point of recovery from the lowest point: a ray of yang returning after the extreme. The beginning of a new cycle.\n\nVery practical advice: while the sprout is still tender, "close the gates and rest" — do not rush to expand; protect and nurture the new. Recovery needs time and quiet cultivation.',
      },
    },
  },
  25: {
    modernShort:
      'Hành động hồn nhiên, không vụ lợi — thuận tự nhiên và ngay thẳng thì không lỗi.',
    keywords: ['chân thật', 'vô tư', 'tự nhiên'],
    judgmentClassic:
      'Rất hanh thông, lợi về giữ chính; nếu không chính đáng thì có tai họa, không lợi về chỗ có đi (无妄：元亨，利貞。其匪正有眚，不利有攸往).',
    imageClassic:
      'Dưới trời sấm chạy, muôn vật được phú cho lẽ chân thật không vọng, là Vô Vọng; các tiên vương nhân đó gắng hợp thời để nuôi dưỡng muôn vật (天下雷行，物與无妄；先王以茂對時，育萬物).',
    modernDeep: {
      structureInsight:
        'Trời (Càn) ở trên, sấm (Chấn) ở dưới: sấm động dưới trời, tự nhiên mà phát, không tính toan — tượng sự chân thật, hành động hồn nhiên thuận lẽ trời.',
      transformInsight:
        'Đảo thành Đại Súc (#26): chân thật vô tư (Vô Vọng) và tích chứa nội lực lớn (Đại Súc) là cặp đi liền. Đối là Thăng (#46), hỗ là Tiệm (#53).',
      binaryInsight:
        'Giá trị 57, ô (hàng 7 = Càn, cột 1 = Chấn).',
      linePositions:
        'Hào 2 và hào 5 đều trung chính và ứng nhau: trục "chân chính" của quẻ. "Không chính thì có họa": vô vọng là thuận tự nhiên, nhưng phải đúng — hành động bừa nhân danh "tự nhiên" sẽ gặp tai vạ.',
      modernMapping:
        'Vô Vọng là hành động hồn nhiên, không vụ lợi, không vọng tưởng: làm điều đúng vì nó đúng, thuận theo lẽ tự nhiên.\n\nNhưng có lằn ranh sắc: "tự nhiên" không phải tùy tiện. Chỉ khi ngay thẳng thì sự hồn nhiên mới không lỗi; mưu cầu ngoài lẽ thì rước họa.',
    },
    en: {
      modernShort:
        'Acting with spontaneous integrity, without ulterior motive — go with nature and stay upright, and there is no blame.',
      keywords: ['sincerity', 'selflessness', 'naturalness'],
      judgmentGloss:
        'Supremely pervading, furthering through perseverance; if not correct, there is calamity, and it does not further to have somewhere to go (无妄：元亨，利貞。其匪正有眚，不利有攸往).',
      imageGloss:
        'Under heaven thunder rolls, and all things are endowed with the truth free of pretense: Innocence; the ancient kings accordingly, matching the season, nourished all things (天下雷行…育萬物).',
      modernDeep: {
        structureInsight:
          'Heaven (Qian) above, thunder (Zhen) below: thunder stirring under heaven, arising naturally, uncalculating — the image of sincerity, spontaneous action in accord with the way of heaven.',
        transformInsight:
          'Reversed, it becomes the Taming Power of the Great (#26): selfless sincerity (Wu Wang) and the storing of great inner force (Da Chu) are a pair. Its opposite is Pushing Upward (#46); its nuclear is Development (#53).',
        binaryInsight:
          'Value 57, cell (row 7 = Qian, col 1 = Zhen).',
        linePositions:
          'Lines 2 and 5 are both central and correct and resonate: the "upright" axis of the hexagram. "Not correct, and there is calamity": innocence is going with nature, but it must be correct — acting recklessly in the name of "nature" meets disaster.',
        modernMapping:
          'Wu Wang is acting with spontaneous integrity, without ulterior motive or delusion: doing the right thing because it is right, going with the natural course.\n\nBut there is a sharp line: "natural" is not arbitrary. Only when upright is spontaneity blameless; to grasp for what lies outside the natural course invites disaster.',
      },
    },
  },
  26: {
    modernShort:
      'Dồn nén năng lượng lớn — kiềm chế và bồi dưỡng nội lực, chờ thời để bung sức mạnh.',
    keywords: ['tích luỹ lớn', 'nội lực', 'chờ thời'],
    judgmentClassic:
      'Lợi về giữ chính; không ăn cơm nhà (mà ra giúp đời) thì tốt, lợi vượt sông lớn (大畜：利貞，不家食吉，利涉大川).',
    imageClassic:
      'Trời nằm trong núi (núi chứa được cả trời), là Đại Súc; người quân tử nhân đó học rộng lời xưa nết trước để tích chứa đức của mình (天在山中，大畜；君子以多識前言往行，以畜其德).',
    modernDeep: {
      structureInsight:
        'Núi (Cấn, dừng) ở trên, trời (Càn, sức lớn) ở dưới: núi ngăn giữ được cả sức trời — tượng dồn nén và tích chứa năng lượng lớn.',
      transformInsight:
        'Đảo của Vô Vọng (#25): chân thật vô tư (Vô Vọng) và tích đức lớn (Đại Súc) đi liền — tích chứa phải đặt trên nền ngay thẳng. Đối là Tụy (#45), hỗ là Quy Muội (#54).',
      binaryInsight:
        'Giá trị 39, ô (hàng 4 = Cấn, cột 7 = Càn).',
      linePositions:
        'Hào 2 ứng hào 5: sức dương ở dưới chịu sự "súc" (ghìm, nuôi) của trên. Khác Tiểu Súc (#9) chỉ một âm ghìm — ở đây cả khối núi ghìm trời, nên "đại súc", tích được lớn.',
      modernMapping:
        'Đại Súc là dồn nén nội lực lớn: học rộng, rèn đức, tích lũy năng lực và nguồn lực trước khi bung.\n\n"Không ăn cơm nhà thì tốt": cái tích được không phải để giữ riêng mà để ra giúp đời, làm việc lớn ("vượt sông lớn"). Tích để cho, không phải để ôm.',
    },
    en: {
      modernShort:
        'Storing up great energy — restrain and cultivate inner force, awaiting the time to unleash strength.',
      keywords: ['great accumulation', 'inner force', 'awaiting the time'],
      judgmentGloss:
        'Furthering through perseverance; not eating at home (going forth to serve) is auspicious; it furthers to cross the great water (利貞，不家食吉，利涉大川).',
      imageGloss:
        'Heaven within the mountain: the Taming Power of the Great; the noble person accordingly learns much of the words and deeds of old to store up their virtue (天在山中…以畜其德).',
      modernDeep: {
        structureInsight:
          'Mountain (Gen, stopping) above, heaven (Qian, great strength) below: the mountain holds back even the strength of heaven — the image of restraining and storing great energy.',
        transformInsight:
          'The reversed of Innocence (#25): selfless sincerity (Wu Wang) and storing great virtue (Da Chu) go together — accumulation must rest on an upright foundation. Its opposite is Gathering Together (#45); its nuclear is The Marrying Maiden (#54).',
        binaryInsight:
          'Value 39, cell (row 4 = Gen, col 7 = Qian).',
        linePositions:
          'Line 2 resonates with line 5: the yang force below is "stored" (reined in, nurtured) by what is above. Unlike the Taming Power of the Small (#9), where one yin reins in — here the whole mountain reins in heaven, so it is a "great" taming, storing much.',
        modernMapping:
          'Da Chu is storing up great inner force: learn widely, refine virtue, accumulate capacity and resources before unleashing.\n\n"Not eating at home is auspicious": what is stored is not to be kept for oneself but to serve the world, to do great things ("cross the great water"). Store in order to give, not to hoard.',
      },
    },
  },
  27: {
    modernShort:
      'Chăm lo nuôi dưỡng — chú ý nuôi gì cho thân và tâm; lời nói và cái ăn đều cần tiết độ.',
    keywords: ['nuôi dưỡng', 'tiết độ', 'chăm sóc'],
    judgmentClassic:
      'Giữ chính thì tốt. Xem cách nuôi dưỡng, tự mình lo lấy miếng ăn (頤：貞吉。觀頤，自求口實).',
    imageClassic:
      'Dưới núi có sấm, là Di; người quân tử nhân đó thận trọng lời nói, tiết độ ăn uống (山下有雷，頤；君子以慎言語，節飲食).',
    modernDeep: {
      structureInsight:
        'Núi (Cấn, dừng) ở trên, sấm (Chấn, động) ở dưới: trên tĩnh dưới động như hàm trên–hàm dưới khi nhai. Hình quẻ giống cái miệng mở (hai hào cứng ngoài, bốn hào rỗng giữa) — "di" là nuôi dưỡng.',
      transformInsight:
        'Đối là Đại Quá (#28): nuôi dưỡng điều độ (Di) so với quá tải (Đại Quá). Di là quẻ tự-đảo (lật trên–dưới vẫn là chính nó), hợp tượng cái miệng cân đối. Hỗ là Khôn (#2).',
      binaryInsight:
        'Giá trị 33, ô (hàng 4 = Cấn, cột 1 = Chấn). Lật ngược trên–dưới vẫn ra chính nó — một trong số ít quẻ đối xứng.',
      linePositions:
        'Hào 2 đắc trung; cặp 1–4 và 3–6 có ứng. Bốn hào âm rỗng ở giữa cần được nuôi bởi hai hào dương cứng ở hai đầu — tượng nuôi từ gốc (dưới) và từ trên.',
      modernMapping:
        'Di là chăm lo nuôi dưỡng — cả thân lẫn tâm: nuôi gì vào người, nuôi gì vào đầu.\n\nHai lời rất đời: "thận trọng lời nói, tiết độ ăn uống" — cái vào miệng (đồ ăn) và cái ra miệng (lời) đều cần điều độ. Và "tự lo lấy miếng ăn": nuôi mình chính đáng bằng sức mình.',
    },
    en: {
      modernShort:
        'Attending to nourishment — mind what you feed body and soul; both what you say and what you eat need measure.',
      keywords: ['nourishment', 'moderation', 'care'],
      judgmentGloss:
        'Perseverance brings good fortune. Observe how one nourishes, and seek your own sustenance (貞吉。觀頤，自求口實).',
      imageGloss:
        'Below the mountain there is thunder: Nourishment; the noble person accordingly is careful of their words and temperate in eating and drinking (山下有雷，頤；君子以慎言語，節飲食).',
      modernDeep: {
        structureInsight:
          'Mountain (Gen, stopping) above, thunder (Zhen, motion) below: still above and moving below, like the upper and lower jaws in chewing. The figure resembles an open mouth (two firm lines outside, four empty within) — "Yi" is nourishment.',
        transformInsight:
          'Its opposite is Preponderance of the Great (#28): temperate nourishment (Yi) versus overload (Da Guo). Yi is a self-inverting hexagram (flipping top and bottom leaves it unchanged), fitting the image of a balanced mouth. Its nuclear is Earth (#2).',
        binaryInsight:
          'Value 33, cell (row 4 = Gen, col 1 = Zhen). Flipping top and bottom yields itself — one of the few symmetric hexagrams.',
        linePositions:
          'Line 2 is central; the pairs 1–4 and 3–6 resonate. The four empty yin lines in the middle need to be nourished by the two firm yang lines at either end — the image of nourishing from the root (below) and from above.',
        modernMapping:
          'Yi is attending to nourishment — of both body and mind: what you feed into yourself, what you feed into your head.\n\nTwo very down-to-earth lines: "be careful of words, temperate in food" — what goes into the mouth (food) and what comes out of it (words) both need moderation. And "seek your own sustenance": nourish yourself rightfully, by your own effort.',
      },
    },
  },
  28: {
    modernShort:
      'Xà nhà oằn vì quá nặng — tình thế vượt sức bình thường, cần biện pháp khác thường mà vẫn vững gốc.',
    keywords: ['quá tải', 'khác thường', 'gánh nặng'],
    judgmentClassic:
      'Cây xà oằn xuống; lợi về chỗ có đi, hanh thông (大過：棟橈，利有攸往，亨).',
    imageClassic:
      'Nước đầm ngập chết cây, là Đại Quá; người quân tử nhân đó đứng một mình không sợ, lánh đời mà không buồn (澤滅木，大過；君子以獨立不懼，遯世无悶).',
    modernDeep: {
      structureInsight:
        'Đầm (Đoài) ở trên, gió/cây (Tốn) ở dưới: nước đầm dâng ngập cây. Bốn hào dương dồn ở giữa, hai hào âm yếu ở hai đầu — như cây xà giữa nặng mà hai đầu mảnh, nên oằn.',
      transformInsight:
        'Đối là Di (#27): quá tải (Đại Quá) so với nuôi dưỡng điều độ (Di). Đại Quá cũng là quẻ tự-đảo. Hỗ là Càn (#1) — lõi toàn dương, nhấn cái "quá mạnh" dồn ở giữa.',
      binaryInsight:
        'Giá trị 30, ô (hàng 3 = Đoài, cột 6 = Tốn). Đối xứng khi lật trên–dưới.',
      linePositions:
        'Hào 5 đắc trung nhưng cả quẻ "giữa nặng đầu yếu": bốn dương chen giữa, hai âm đỡ hai đầu quá mảnh. Tượng tình thế gánh nặng vượt sức của khung đỡ.',
      modernMapping:
        'Đại Quá là khi tải trọng vượt quá sức chịu bình thường — "xà nhà oằn". Khủng hoảng, áp lực lớn dồn vào điểm yếu.\n\nLối ra không phải gồng theo lối cũ mà cần biện pháp khác thường, đồng thời gia cố cái gốc. Tinh thần quẻ: dám "đứng một mình không sợ" khi tình thế ngặt nghèo.',
    },
    en: {
      modernShort:
        'The ridgepole sags under too great a load — a situation beyond ordinary strength, calling for extraordinary measures while keeping the root firm.',
      keywords: ['overload', 'the extraordinary', 'burden'],
      judgmentGloss:
        'The ridgepole sags; it furthers to have somewhere to go, pervading (棟橈，利有攸往，亨).',
      imageGloss:
        'The lake rises over and drowns the trees: Preponderance of the Great; the noble person accordingly stands alone without fear and, withdrawing from the world, feels no discontent (澤滅木…遯世无悶).',
      modernDeep: {
        structureInsight:
          'Lake (Dui) above, wind/wood (Xun) below: the lake’s water rises and drowns the trees. Four yang lines massed in the middle, two weak yin at the ends — like a ridgepole heavy in the center with thin ends, so it sags.',
        transformInsight:
          'Its opposite is Nourishment (#27): overload (Da Guo) versus temperate nourishment (Yi). Da Guo is also a self-inverting hexagram. Its nuclear is Heaven (#1) — an all-yang core, stressing the "too much strength" massed in the middle.',
        binaryInsight:
          'Value 30, cell (row 3 = Dui, col 6 = Xun). Symmetric under flipping top and bottom.',
        linePositions:
          'Line 5 is central, but the whole hexagram is "heavy in the middle, weak at the ends": four yang crowd the center while two yin at the ends are too slender to bear them. The image of a load beyond the frame’s strength.',
        modernMapping:
          'Da Guo is when the load exceeds ordinary bearing strength — "the ridgepole sags." Crisis, great pressure bearing down on a weak point.\n\nThe way out is not to grind on in the old manner but to take extraordinary measures while reinforcing the root. The spirit of the hexagram: dare to "stand alone without fear" when the situation is dire.',
      },
    },
  },
  29: {
    modernShort:
      'Vực nước nối vực nước — giữ lòng thành và đều đặn như nước, quen với hiểm để vượt hiểm.',
    keywords: ['hiểm', 'kiên trì', 'thành thật'],
    judgmentClassic:
      'Hiểm trùng hiểm; có lòng thành, cốt ở tâm hanh thông; hành động thì được chuộng (習坎：有孚，維心亨，行有尚).',
    imageClassic:
      'Nước tới tấp nối nhau, là Tập Khảm; người quân tử nhân đó giữ đức cho thường hằng, luyện tập việc dạy dỗ (水洊至，習坎；君子以常德行，習教事).',
    modernDeep: {
      structureInsight:
        'Nước (Khảm) chồng lên nước (Khảm): hiểm nối hiểm. Mỗi quẻ đơn có hào dương kẹt giữa hai hào âm — như dòng nước lọt giữa hai bờ vực, càng vùng càng sâu.',
      transformInsight:
        'Đối là Thuần Ly (#30): hiểm (nước, Khảm) so với sáng (lửa, Ly) — nước–lửa là cặp đối cốt lõi. Khảm là quẻ tự-đảo. Hỗ là Di (#27).',
      binaryInsight:
        'Giá trị 18, ô (hàng 2 = Khảm, cột 2 = Khảm). Một trong tám quẻ thuần (hai quẻ đơn giống nhau).',
      linePositions:
        'Hào 2 và hào 5 (đều dương, đắc trung) là cái "thành thật bên trong" giữ cho khỏi chìm. Không cặp nào ứng nhau (hai quẻ đơn giống hệt) — qua hiểm phải tự cậy lòng thành của mình, ít chỗ dựa ngoài.',
      modernMapping:
        'Tập Khảm là hiểm chồng hiểm: khó khăn này chưa qua, khó khăn khác đã tới. Càng hoảng loạn vùng vẫy càng lún.\n\nChìa khóa nằm ở chữ "tâm hanh": giữ lòng thành và sự đều đặn như nước — nước qua bao vực vẫn cứ chảy, không đổi bản chất. Quen với hiểm, làm đúng cách một cách đều đặn, thì vượt được.',
    },
    en: {
      modernShort:
        'Chasm upon chasm of water — keep sincerity and steadiness like water, grow familiar with danger in order to get through it.',
      keywords: ['danger', 'perseverance', 'sincerity'],
      judgmentGloss:
        'Danger doubled; there is sincerity, and through the heart it pervades; to act wins esteem (習坎：有孚，維心亨，行有尚).',
      imageGloss:
        'Water flows on and on, arriving in waves: the Abysmal Repeated; the noble person accordingly keeps virtue constant and practices the work of teaching (水洊至，習坎；君子以常德行，習教事).',
      modernDeep: {
        structureInsight:
          'Water (Kan) piled on water (Kan): danger upon danger. Each trigram has one yang line trapped between two yin — like a current caught between two chasm walls, the more it thrashes the deeper it sinks.',
        transformInsight:
          'Its opposite is the Clinging (#30): danger (water, Kan) versus brightness (fire, Li) — water and fire are the core opposing pair. Kan is a self-inverting hexagram. Its nuclear is Nourishment (#27).',
        binaryInsight:
          'Value 18, cell (row 2 = Kan, col 2 = Kan). One of the eight doubled hexagrams (two identical trigrams).',
        linePositions:
          'Lines 2 and 5 (both yang, central) are the "inner sincerity" that keeps one from sinking. No pair resonates (the two trigrams are identical) — to get through danger one must rely on one’s own sincerity, with little outside support.',
        modernMapping:
          'Kan is danger heaped on danger: one hardship not yet past and another already arrives. The more you thrash in panic, the deeper you sink.\n\nThe key is in "the heart pervades": keep sincerity and steadiness like water — water crosses countless chasms yet keeps flowing, never changing its nature. Grow familiar with danger, act rightly and steadily, and you get through.',
      },
    },
  },
  30: {
    modernShort:
      'Ánh sáng cần chất bám — giữ sự sáng suốt bằng cách nương vào điều đúng, soi mà không thiêu.',
    keywords: ['sáng tỏ', 'nương tựa', 'minh mẫn'],
    judgmentClassic:
      'Lợi về giữ chính, hanh thông; nuôi bò cái (đức nhu thuận) thì tốt (離：利貞，亨，畜牝牛吉).',
    imageClassic:
      'Hai lần sáng nối nhau làm nên Ly; bậc đại nhân nhân đó nối tiếp ánh sáng, soi tỏ khắp bốn phương (明兩作，離；大人以繼明照于四方).',
    modernDeep: {
      structureInsight:
        'Lửa (Ly) chồng lên lửa (Ly): sáng nối sáng. Mỗi quẻ đơn có hào âm rỗng kẹt giữa hai hào dương — lửa cần chất bám (cái rỗng ở giữa) mới cháy, ánh sáng phải nương vào vật.',
      transformInsight:
        'Đối là Tập Khảm (#29): sáng (Ly) so với hiểm (Khảm) — cặp lửa–nước. Ly là quẻ tự-đảo. Hỗ là Đại Quá (#28).',
      binaryInsight:
        'Giá trị 45, ô (hàng 5 = Ly, cột 5 = Ly). Một trong tám quẻ thuần.',
      linePositions:
        'Hào 2 (âm, trung chính) là chỗ "rỗng" giữ được lửa sáng nhất — đức mềm ở giữa làm cái sáng bền. Như Khảm, hai quẻ đơn giống nhau nên không cặp hào ứng: sự sáng phải tự nương vào điều đúng.',
      modernMapping:
        'Ly là ánh sáng, sự sáng suốt, minh mẫn — nhưng lửa không cháy trong chân không: trí sáng cần bám vào điều đúng, vào thực tại, vào kỷ luật.\n\n"Nuôi bò cái" (đức nhu thuận) cho thấy: sáng mà mềm mỏng, nương tựa đúng chỗ thì soi xa; sáng mà cương cường thiêu đốt thì tự tàn.',
    },
    en: {
      modernShort:
        'Light needs something to cling to — keep clarity by leaning on what is right; illuminate without scorching.',
      keywords: ['clarity', 'dependence', 'discernment'],
      judgmentGloss:
        'Furthering through perseverance, pervading; nourishing a cow (the virtue of yielding docility) brings good fortune (利貞，亨，畜牝牛吉).',
      imageGloss:
        'Brightness doubled makes the Clinging; the great person accordingly carries on the light, illuminating the four quarters (明兩作，離；大人以繼明照于四方).',
      modernDeep: {
        structureInsight:
          'Fire (Li) upon fire (Li): brightness upon brightness. Each trigram has a hollow yin line between two yang — fire needs fuel (the hollow in the middle) to burn; light must cling to something.',
        transformInsight:
          'Its opposite is the Abysmal (#29): brightness (Li) versus danger (Kan) — the fire–water pair. Li is a self-inverting hexagram. Its nuclear is Preponderance of the Great (#28).',
        binaryInsight:
          'Value 45, cell (row 5 = Li, col 5 = Li). One of the eight doubled hexagrams.',
        linePositions:
          'Line 2 (yin, central and correct) is the "hollow" that holds the brightest flame — soft virtue at the center makes the light lasting. As with Kan, the two identical trigrams give no resonant pair: brightness must lean on what is right by itself.',
        modernMapping:
          'Li is light, clarity, insight — but fire does not burn in a vacuum: a bright mind needs to cling to what is right, to reality, to discipline.\n\n"Nourishing a cow" (the virtue of yielding docility) shows: brightness that is gentle and rightly grounded shines far; brightness that is harsh and scorching burns itself out.',
      },
    },
  },
  31: {
    modernShort:
      'Rung động cảm ứng đôi bên — chân thành thu hút nhau, lắng nghe cảm xúc để kết nối.',
    keywords: ['cảm ứng', 'thu hút', 'kết nối'],
    judgmentClassic:
      'Hanh thông, lợi về giữ chính; cưới vợ thì tốt (咸：亨，利貞，取女吉).',
    imageClassic:
      'Trên núi có đầm (núi rỗng nên chứa được nước), là Hàm; người quân tử nhân đó giữ lòng trống rỗng để đón nhận người (山上有澤，咸；君子以虛受人).',
    modernDeep: {
      structureInsight:
        'Đầm (Đoài, thiếu nữ) ở trên, núi (Cấn, thiếu nam) ở dưới: trai gái trẻ cảm nhau, khí giao cảm từ dưới dâng lên — "hàm" là cảm ứng, rung động qua lại.',
      transformInsight:
        'Đảo thành Hằng (#32): cảm ứng buổi đầu (Hàm) và sự bền lâu (Hằng) là hai chặng của một mối quan hệ. Đối là Tổn (#41), hỗ là Cấu (#44).',
      binaryInsight:
        'Giá trị 28, ô (hàng 3 = Đoài, cột 4 = Cấn). Hàm mở đầu "Hạ Kinh" (nửa sau 64 quẻ, bàn về nhân sự).',
      linePositions:
        'Hào 2 và hào 5 đều trung chính, cả ba cặp đều có ứng — sự cảm ứng trọn vẹn giữa trên và dưới. Đó là vì sao "hàm" là tượng giao cảm đẹp.',
      modernMapping:
        'Hàm là sự cảm ứng, rung động chân thành giữa người với người — gốc của hấp dẫn, đồng cảm, kết nối.\n\nBí quyết nằm ở "hư thụ nhân": giữ lòng trống (không định kiến, không đầy ắp cái tôi) thì mới đón được người khác vào. Cảm hóa nhau bằng chân thành, không bằng áp đặt.',
    },
    en: {
      modernShort:
        'Mutual resonance and attraction — sincere feeling draws two together; listen to emotion to connect.',
      keywords: ['resonance', 'attraction', 'connection'],
      judgmentGloss:
        'Pervading, furthering through perseverance; to take a wife brings good fortune (亨，利貞，取女吉).',
      imageGloss:
        'On the mountain there is a lake (the hollow holds the water): Influence; the noble person accordingly keeps an empty heart to receive others (山上有澤，咸；君子以虛受人).',
      modernDeep: {
        structureInsight:
          'Lake (Dui, youngest daughter) above, mountain (Gen, youngest son) below: young man and woman feeling for each other, the responsive force rising from below — "Xian" is influence, resonance passing back and forth.',
        transformInsight:
          'Reversed, it becomes Duration (#32): the first resonance (Xian) and lasting endurance (Heng) are two stages of a relationship. Its opposite is Decrease (#41); its nuclear is Coming to Meet (#44).',
        binaryInsight:
          'Value 28, cell (row 3 = Dui, col 4 = Gen). Xian opens the "Lower Canon" (the second half of the 64, on human affairs).',
        linePositions:
          'Lines 2 and 5 are both central and correct, and all three pairs resonate — complete resonance between above and below. That is why "Xian" is the image of beautiful mutual feeling.',
        modernMapping:
          'Xian is resonance, sincere mutual feeling between people — the root of attraction, empathy, connection.\n\nThe secret lies in "receiving others with an empty heart": keep the heart open (no preconception, no ego crammed in) to let another in. Move one another by sincerity, not by force.',
      },
    },
  },
  32: {
    modernShort:
      'Sự bền bỉ lâu dài — kiên trì theo đạo thường hằng, đổi cách nhưng giữ nguyên cốt lõi.',
    keywords: ['bền lâu', 'kiên trì', 'ổn định'],
    judgmentClassic:
      'Hanh thông, không lỗi; lợi về giữ chính, lợi về chỗ có đi (恆：亨，无咎，利貞，利有攸往).',
    imageClassic:
      'Sấm và gió (luôn đi cùng nhau), là Hằng; người quân tử nhân đó đứng vững, không đổi phương hướng (雷風，恆；君子以立不易方).',
    modernDeep: {
      structureInsight:
        'Sấm (Chấn) ở trên, gió (Tốn) ở dưới: sấm gió luôn đi cùng nhau, lặp đi lặp lại — tượng sự bền bỉ, lâu dài, thường hằng.',
      transformInsight:
        'Đảo của Hàm (#31): cảm ứng (Hàm) chuyển sang duy trì lâu bền (Hằng). Đối là Ích (#42), hỗ là Quải (#43).',
      binaryInsight:
        'Giá trị 14, ô (hàng 1 = Chấn, cột 6 = Tốn).',
      linePositions:
        'Cả ba cặp đều có ứng như Hàm, nhưng không hào nào vừa trung vừa chính — bền lâu không cần mọi thứ hoàn hảo, cần sự kiên trì đúng hướng. "Đứng không đổi phương" là cốt.',
      modernMapping:
        'Hằng là sự bền bỉ: giữ một hướng đi, một cam kết qua thời gian. Hôn nhân, sự nghiệp, kỷ luật cá nhân đều sống nhờ chữ này.\n\nĐiểm tinh tế: "thường hằng" không phải đứng yên cứng nhắc. Sấm gió luôn vận động — bền là giữ NGUYÊN cái cốt (phương hướng, giá trị) trong khi cách làm vẫn đổi theo thời.',
    },
    en: {
      modernShort:
        'Lasting endurance — persevere in the constant way, changing your methods but keeping the core unchanged.',
      keywords: ['endurance', 'perseverance', 'stability'],
      judgmentGloss:
        'Pervading, no blame; furthering through perseverance, furthering to have somewhere to go (亨，无咎，利貞，利有攸往).',
      imageGloss:
        'Thunder and wind (always together) make Duration; the noble person accordingly stands firm and does not change direction (雷風，恆；君子以立不易方).',
      modernDeep: {
        structureInsight:
          'Thunder (Zhen) above, wind (Xun) below: thunder and wind always go together, repeating again and again — the image of endurance, of what lasts and is constant.',
        transformInsight:
          'The reversed of Influence (#31): resonance (Xian) turning into lasting maintenance (Heng). Its opposite is Increase (#42); its nuclear is Break-through (#43).',
        binaryInsight:
          'Value 14, cell (row 1 = Zhen, col 6 = Xun).',
        linePositions:
          'All three pairs resonate as in Xian, but no line is both central and correct — enduring does not require everything to be perfect; it requires persistence in the right direction. "Standing without changing direction" is the core.',
        modernMapping:
          'Heng is endurance: keeping one direction, one commitment, over time. Marriage, career, personal discipline all live by this word.\n\nA subtle point: "constancy" is not rigid standing still. Thunder and wind are always in motion — to endure is to keep the CORE (direction, values) unchanged while the methods still change with the times.',
      },
    },
  },
  33: {
    modernShort:
      'Rút lui đúng lúc — biết lùi khi khí xấu lên, giữ khoảng cách để bảo toàn và chờ thời.',
    keywords: ['rút lui', 'bảo toàn', 'biết lùi'],
    judgmentClassic:
      'Hanh thông; lợi nhỏ về giữ chính (遯：亨，小利貞).',
    imageClassic:
      'Dưới trời có núi (núi cố vươn mà trời vẫn lùi xa), là Độn; người quân tử nhân đó xa kẻ tiểu nhân — không tỏ ghét mà vẫn nghiêm (天下有山，遯；君子以遠小人，不惡而嚴).',
    modernDeep: {
      structureInsight:
        'Trời (Càn) ở trên cứ lùi lên cao, núi (Cấn) ở dưới vươn theo không kịp: hai hào âm mọc từ đáy đẩy dần, dương phải lui — "độn" là ẩn, lui.',
      transformInsight:
        'Đảo thành Đại Tráng (#34): lui ẩn (Độn) và sức cường thịnh (Đại Tráng) là cặp gương — âm lên thì quân tử lui, dương thịnh thì tiến. Đối là Lâm (#19), hỗ là Cấu (#44).',
      binaryInsight:
        'Giá trị 60, ô (hàng 7 = Càn, cột 4 = Cấn) — hai hào âm ở đáy đang đẩy, bốn dương lui lên (Độn thuộc 12 Tích quái).',
      linePositions:
        'Hào 2 và hào 5 đều trung chính và ứng nhau: ngay cả khi phải lui vẫn giữ trục chính đính. "Không tỏ ghét mà vẫn nghiêm": lui đúng cách là giữ khoảng cách có phẩm giá.',
      modernMapping:
        'Độn là biết rút lui đúng lúc: khi khí xấu/tiểu nhân đang lên, cố trụ lại chỉ chuốc hại. Lùi để bảo toàn và chờ thời.\n\nRút lui không phải bỏ chạy hèn nhát: "không tỏ ghét mà vẫn nghiêm" — giữ khoảng cách, giữ nguyên tắc, không gây thù mà cũng không nhập nhằng. Một nghệ thuật lui rất bản lĩnh.',
    },
    en: {
      modernShort:
        'Retreating at the right time — knowing to withdraw as bad forces rise, keeping distance to preserve yourself and await the time.',
      keywords: ['retreat', 'preservation', 'knowing when to withdraw'],
      judgmentGloss:
        'Pervading; a small furthering through perseverance (亨，小利貞).',
      imageGloss:
        'Under heaven there is a mountain: Retreat; the noble person accordingly keeps the petty at a distance — not with shows of dislike, but with dignity (天下有山，遯…不惡而嚴).',
      modernDeep: {
        structureInsight:
          'Heaven (Qian) above keeps withdrawing higher, mountain (Gen) below strives up but cannot catch it: two yin lines grow from the base and press up, and yang must retreat — "Dun" is to hide, to withdraw.',
        transformInsight:
          'Reversed, it becomes the Power of the Great (#34): withdrawal (Dun) and vigorous strength (Da Zhuang) are a mirror pair — as yin rises the noble withdraws, as yang flourishes it advances. Its opposite is Approach (#19); its nuclear is Coming to Meet (#44).',
        binaryInsight:
          'Value 60, cell (row 7 = Qian, col 4 = Gen) — two yin lines at the base pressing up, four yang withdrawing above (Dun is one of the twelve sovereign hexagrams).',
        linePositions:
          'Lines 2 and 5 are both central and correct and resonate: even in retreat, keep an upright axis. "Not with shows of dislike, but with dignity": to retreat rightly is to keep distance with dignity.',
        modernMapping:
          'Dun is knowing to retreat at the right time: when bad forces or petty people are rising, clinging to your position only brings harm. Withdraw to preserve yourself and await the time.\n\nRetreat is not cowardly flight: "no shows of dislike, but with dignity" — keep your distance, keep your principles, make no enemies yet stay unambiguous. An art of withdrawal that takes real backbone.',
      },
    },
  },
  34: {
    modernShort:
      'Sức cường thịnh dâng cao — mạnh nhưng phải đi đôi với chính đáng, đừng dùng lực bừa.',
    keywords: ['sức mạnh', 'chính đáng', 'tiết chế'],
    judgmentClassic:
      'Lợi về giữ chính (大壯：利貞).',
    imageClassic:
      'Sấm vang trên trời, là Đại Tráng; người quân tử nhân đó: không hợp lễ thì không làm (雷在天上，大壯；君子以非禮弗履).',
    modernDeep: {
      structureInsight:
        'Sấm (Chấn) trên trời (Càn): tiếng sấm dậy giữa trời cao — bốn hào dương mạnh mẽ dâng từ đáy lên, khí cường thịnh.',
      transformInsight:
        'Đảo của Độn (#33): dương thịnh tiến (Đại Tráng) so với dương lui ẩn (Độn). Đối là Quán (#20), hỗ là Quải (#43) — cùng là khí dương đẩy lên.',
      binaryInsight:
        'Giá trị 15, ô (hàng 1 = Chấn, cột 7 = Càn) — bốn hào dương dâng lên (Đại Tráng thuộc 12 Tích quái, ứng Xuân phân).',
      linePositions:
        'Không hào nào vừa trung vừa chính dù sức rất mạnh — đúng cảnh "cường" dễ thiếu sự đúng mực. Vì thế lời quẻ chỉ vỏn vẹn "lợi trinh": mạnh thì phải kèm chính đáng.',
      modernMapping:
        'Đại Tráng là sức cường thịnh dâng cao: thế đang lên, lực đang mạnh. Nhưng quẻ không khen sức — nó cảnh báo.\n\n"Không hợp lễ thì không làm": sức mạnh chỉ bền khi đi đôi với chính đáng và chừng mực. Cường mà dùng lực bừa (như dê húc rào mắc sừng) thì tự kẹt. Mạnh nhất là sức được kỷ luật.',
    },
    en: {
      modernShort:
        'Vigorous strength surging high — strong, but it must go with what is right; do not use force recklessly.',
      keywords: ['power', 'rightness', 'restraint'],
      judgmentGloss:
        'Furthering through perseverance (利貞).',
      imageGloss:
        'Thunder resounds in heaven: the Power of the Great; the noble person accordingly does not tread what is not in accord with propriety (雷在天上，大壯；君子以非禮弗履).',
      modernDeep: {
        structureInsight:
          'Thunder (Zhen) over heaven (Qian): thunder pealing high in the sky — four strong yang lines surging up from the base, a vigorous, flourishing force.',
        transformInsight:
          'The reversed of Retreat (#33): flourishing yang advancing (Da Zhuang) versus yang withdrawing (Dun). Its opposite is Contemplation (#20); its nuclear is Break-through (#43) — both yang forces pushing up.',
        binaryInsight:
          'Value 15, cell (row 1 = Zhen, col 7 = Qian) — four yang lines surging up (Da Zhuang is one of the twelve sovereign hexagrams, matching the spring equinox).',
        linePositions:
          'No line is both central and correct despite the great strength — fittingly, "power" easily lacks measure. So the judgment is only "furthering through perseverance": strength must come with rightness.',
        modernMapping:
          'Da Zhuang is vigorous strength surging high: momentum rising, force strong. But the hexagram does not praise strength — it warns.\n\n"Do not tread what is against propriety": strength lasts only when joined with rightness and measure. Power used recklessly (like a ram butting a fence and catching its horns) traps itself. The greatest strength is disciplined strength.',
      },
    },
  },
  35: {
    modernShort:
      'Vầng dương lên cao — thăng tiến thuận lợi, được tin dùng; tiến lên cởi mở và sáng tỏ.',
    keywords: ['tiến tới', 'thăng tiến', 'rạng rỡ'],
    judgmentClassic:
      'Bậc hầu yên trị được ban nhiều ngựa, một ngày được tiếp đón ba lần (晉：康侯用錫馬蕃庶，晝日三接).',
    imageClassic:
      'Mặt trời mọc lên khỏi mặt đất, là Tấn; người quân tử nhân đó tự làm sáng cái đức sáng của mình (明出地上，晉；君子以自昭明德).',
    modernDeep: {
      structureInsight:
        'Lửa/mặt trời (Ly) ở trên, đất (Khôn) ở dưới: vầng dương vừa nhô lên khỏi mặt đất và lên cao dần — tượng sự thăng tiến, ngày càng rạng.',
      transformInsight:
        'Đảo thành Minh Di (#36): mặt trời lên (Tấn) và mặt trời lặn vào đất (Minh Di) là cặp gương — rạng rỡ và bị che. Đối là Nhu (#5), hỗ là Kiển (#39).',
      binaryInsight:
        'Giá trị 40, ô (hàng 5 = Ly, cột 0 = Khôn).',
      linePositions:
        'Hào 5 (âm) ở vị tôn, đắc trung, được các hào ngước theo như hướng về mặt trời; hào 2 đắc trung chính ứng trợ. Thăng tiến nhờ sự sáng và được tin, không nhờ chen lấn.',
      modernMapping:
        'Tấn là thăng tiến thuận lợi, được tin dùng, danh tiếng lên như mặt trời mọc. Hợp để tiến tới cởi mở, minh bạch.\n\n"Tự làm sáng đức sáng": lên cao bền vững là nhờ tự rèn phẩm chất cho xứng vị trí, để cái sáng bên trong tương xứng với hào quang bên ngoài.',
    },
    en: {
      modernShort:
        'The sun climbing high — smooth advancement, trusted and employed; advance openly and in clarity.',
      keywords: ['advance', 'promotion', 'radiance'],
      judgmentGloss:
        'A peaceful marquis is granted many horses and received three times in a single day (康侯用錫馬蕃庶，晝日三接).',
      imageGloss:
        'The sun rises above the earth: Progress; the noble person accordingly brightens their own bright virtue (明出地上，晉；君子以自昭明德).',
      modernDeep: {
        structureInsight:
          'Fire/sun (Li) above, earth (Kun) below: the sun has just risen above the earth and climbs higher — the image of advancement, growing ever brighter.',
        transformInsight:
          'Reversed, it becomes Darkening of the Light (#36): the sun rising (Jin) and the sun sinking into the earth (Ming Yi) are a mirror pair — radiance and eclipse. Its opposite is Waiting (#5); its nuclear is Obstruction (#39).',
        binaryInsight:
          'Value 40, cell (row 5 = Li, col 0 = Kun).',
        linePositions:
          'Line 5 (yin) in the honored place, central, with the lines looking up to it as toward the sun; line 2, central and correct, resonates in support. Advancement comes through brightness and trust, not through shoving.',
        modernMapping:
          'Jin is smooth advancement, being trusted and employed, one’s name rising like the rising sun. Good for advancing openly and transparently.\n\n"Brighten your own bright virtue": lasting ascent comes from refining your character to match the position, so that the inner light matches the outer glow.',
      },
    },
  },
  36: {
    modernShort:
      'Ánh sáng lặn xuống đất — thời tối tăm, giấu tài giữ sáng bên trong, chịu đựng mà không mất mình.',
    keywords: ['ẩn mình', 'chịu đựng', 'giữ sáng'],
    judgmentClassic:
      'Lợi về giữ chính trong gian nan (明夷：利艱貞).',
    imageClassic:
      'Ánh sáng lặn vào trong lòng đất, là Minh Di; người quân tử nhân đó cai quản đám đông bằng cách giấu sáng đi mà vẫn sáng suốt (明入地中，明夷；君子以蒞眾，用晦而明).',
    modernDeep: {
      structureInsight:
        'Đất (Khôn) ở trên, lửa (Ly) ở dưới: mặt trời chìm xuống dưới đất — ánh sáng bị che lấp. "Minh di" là cái sáng bị thương tổn, thời tối tăm.',
      transformInsight:
        'Đảo của Tấn (#35): mặt trời lặn (Minh Di) so với mặt trời mọc (Tấn). Hỗ là Giải (#40), đối là Tụng (#6).',
      binaryInsight:
        'Giá trị 5, ô (hàng 0 = Khôn, cột 5 = Ly).',
      linePositions:
        'Hào 2 (âm, trung chính) là người sáng mà chịu nép dưới — giữ được đức sáng trong cảnh tối. "Dùng chỗ tối mà vẫn sáng": khi bị che, người khôn giấu tài chứ không để tắt.',
      modernMapping:
        'Minh Di là thời tối tăm, người sáng bị vùi dập, tài năng bị che: môi trường xấu, cấp trên hôn ám, thời cuộc nghịch.\n\nKế sách cổ rất sâu: "giấu sáng mà vẫn sáng" — không phô trương để khỏi bị thương, nhưng bên trong vẫn giữ minh mẫn và khí tiết. Chịu đựng mà không đánh mất mình, chờ trời sáng lại.',
    },
    en: {
      modernShort:
        'The light sinks into the earth — a time of darkness; hide your gifts and keep the light within, enduring without losing yourself.',
      keywords: ['concealment', 'endurance', 'keeping the light'],
      judgmentGloss:
        'Furthering to persevere amid hardship (利艱貞).',
      imageGloss:
        'The light sinks into the earth: Darkening of the Light; the noble person accordingly governs the multitude by veiling their brightness yet staying clear-sighted (明入地中…用晦而明).',
      modernDeep: {
        structureInsight:
          'Earth (Kun) above, fire (Li) below: the sun has sunk beneath the earth — the light is eclipsed. "Ming Yi" is brightness wounded, a time of darkness.',
        transformInsight:
          'The reversed of Progress (#35): the sun setting (Ming Yi) versus the sun rising (Jin). Its nuclear is Deliverance (#40); its opposite is Conflict (#6).',
        binaryInsight:
          'Value 5, cell (row 0 = Kun, col 5 = Li).',
        linePositions:
          'Line 2 (yin, central and correct) is the bright one who yields and stays low — keeping bright virtue in a dark time. "Use the dark yet stay bright": when eclipsed, the wise hide their gifts rather than let them be snuffed out.',
        modernMapping:
          'Ming Yi is a dark time when the bright are crushed and talent is hidden: a bad environment, a benighted superior, adverse times.\n\nThe ancient strategy is deep: "veil your brightness yet stay bright" — do not flaunt, lest you be wounded, but keep clarity and integrity within. Endure without losing yourself, and wait for the light to return.',
      },
    },
  },
  37: {
    modernShort:
      'Trật tự trong nhà — mỗi người đúng vai, kỷ cương và ấm áp từ gốc mà lan ra ngoài.',
    keywords: ['gia đình', 'trật tự', 'nền tảng'],
    judgmentClassic:
      'Lợi về sự giữ chính của người nữ (家人：利女貞).',
    imageClassic:
      'Gió từ lửa bốc ra (lửa cháy sinh gió, từ trong ra ngoài), là Gia Nhân; người quân tử nhân đó nói thì có nội dung, làm thì có sự bền (風自火出，家人；君子以言有物，而行有恆).',
    modernDeep: {
      structureInsight:
        'Gió (Tốn) ở trên, lửa (Ly) ở dưới: lửa cháy bên trong sinh ra gió tỏa ra ngoài — tượng ảnh hưởng từ trong nhà (gốc) lan ra ngoài xã hội.',
      transformInsight:
        'Đảo thành Khuê (#38): gia đình hòa thuận (Gia Nhân) và sự chia rẽ (Khuê) là cặp gương — trong nhà thuận thì ngoài đỡ ly tán. Hỗ là Vị Tế (#64), đối là Giải (#40).',
      binaryInsight:
        'Giá trị 53, ô (hàng 6 = Tốn, cột 5 = Ly).',
      linePositions:
        'Hào 2 và hào 5 đều trung chính và ứng nhau: hào 2 (âm) chủ việc trong, hào 5 (dương) chủ việc ngoài — mỗi người một vai, đúng vị thì nhà yên. Trật tự gia đình gói gọn trong cấu trúc hào.',
      modernMapping:
        'Gia Nhân nói về trật tự của một tập thể nhỏ (gia đình, đội nhóm): mỗi người đúng vai, kỷ cương đi cùng sự ấm áp.\n\n"Nói có nội dung, làm có sự bền": nền nếp bắt đầu từ lời nói thực chất và hành động nhất quán của người trong cuộc. Trong vững thì ngoài mới lan tốt — sửa thiên hạ bắt đầu từ sửa nhà.',
    },
    en: {
      modernShort:
        'Order within the home — each in their proper role, discipline and warmth spreading from the root outward.',
      keywords: ['family', 'order', 'foundation'],
      judgmentGloss:
        'Furthering through the perseverance of the woman (利女貞).',
      imageGloss:
        'Wind comes forth from fire (from within outward): The Family; the noble person accordingly has substance in their words and constancy in their deeds (風自火出，家人…而行有恆).',
      modernDeep: {
        structureInsight:
          'Wind (Xun) above, fire (Li) below: fire burning within gives rise to wind spreading outward — the image of influence spreading from within the home (the root) out into society.',
        transformInsight:
          'Reversed, it becomes Opposition (#38): a harmonious family (Jia Ren) and division (Kui) are a mirror pair — harmony within staves off scattering without. Its nuclear is Before Completion (#64); its opposite is Deliverance (#40).',
        binaryInsight:
          'Value 53, cell (row 6 = Xun, col 5 = Li).',
        linePositions:
          'Lines 2 and 5 are both central and correct and resonate: line 2 (yin) governs the inner sphere, line 5 (yang) the outer — each in their role, rightly placed, and the home is at peace. Family order is captured in the very line structure.',
        modernMapping:
          'Jia Ren is about the order of a small group (a family, a team): each in their proper role, discipline going hand in hand with warmth.\n\n"Substance in words, constancy in deeds": order begins with the members’ truthful speech and consistent action. When the inside is firm, it spreads well outside — reforming the world begins with reforming the home.',
      },
    },
  },
  38: {
    modernShort:
      'Hai bên quay lưng — khác biệt và hiểu lầm; việc nhỏ còn được, cần tìm điểm chung để dung hoà.',
    keywords: ['chia rẽ', 'khác biệt', 'dung hoà'],
    judgmentClassic:
      'Việc nhỏ thì tốt (睽：小事吉).',
    imageClassic:
      'Trên lửa dưới đầm (lửa bốc lên, nước chảy xuống, đi hai ngả), là Khuê; người quân tử nhân đó hòa đồng mà vẫn giữ chỗ riêng khác (上火下澤，睽；君子以同而異).',
    modernDeep: {
      structureInsight:
        'Lửa (Ly) ở trên bốc lên, đầm (Đoài) ở dưới chảy xuống: hai bên đi ngược, rời nhau — "khuê" là chia lìa, trái nghịch, hiểu lầm.',
      transformInsight:
        'Đảo của Gia Nhân (#37): trong nhà thuận (Gia Nhân) lật thành ngoài ly tán (Khuê). Đối là Kiển (#39), hỗ là Ký Tế (#63).',
      binaryInsight:
        'Giá trị 43, ô (hàng 5 = Ly, cột 3 = Đoài).',
      linePositions:
        'Hào 2 và hào 5 vẫn ứng nhau dù cả quẻ trái nghịch: giữa chia rẽ còn một sợi dây nối. Vì thế "việc nhỏ thì tốt" — chưa hợp làm lớn, nhưng có thể dò tìm điểm chung từ việc nhỏ.',
      modernMapping:
        'Khuê là lúc các bên quay lưng nhau: khác biệt, hiểu lầm, lệch pha. Cố ép việc lớn lúc này dễ vỡ.\n\nChìa khóa là "đồng mà dị": chấp nhận khác biệt thay vì xóa bỏ, tìm điểm chung nhỏ để bắc cầu. Lửa và nước khác nhau nhưng cùng cần cho nấu nướng — dị biệt không nhất thiết là kẻ thù.',
    },
    en: {
      modernShort:
        'Two turning their backs — difference and misunderstanding; small matters can still succeed, seek common ground to reconcile.',
      keywords: ['division', 'difference', 'reconciliation'],
      judgmentGloss:
        'In small matters, good fortune (小事吉).',
      imageGloss:
        'Fire above, lake below (going two ways): Opposition; the noble person accordingly is in accord yet keeps their own difference (上火下澤，睽；君子以同而異).',
      modernDeep: {
        structureInsight:
          'Fire (Li) above rising, lake (Dui) below sinking: the two go opposite ways, parting — "Kui" is division, opposition, misunderstanding.',
        transformInsight:
          'The reversed of The Family (#37): harmony within (Jia Ren) flips into scattering without (Kui). Its opposite is Obstruction (#39); its nuclear is After Completion (#63).',
        binaryInsight:
          'Value 43, cell (row 5 = Li, col 3 = Dui).',
        linePositions:
          'Lines 2 and 5 still resonate even as the whole hexagram is at odds: amid division a single connecting thread remains. Hence "small matters bring good fortune" — not fit for great undertakings, but common ground can be sought from small things.',
        modernMapping:
          'Kui is when parties turn their backs on each other: difference, misunderstanding, being out of sync. Forcing great ventures now easily shatters.\n\nThe key is "in accord yet different": accept difference rather than erase it, seek small common ground to build a bridge. Fire and water differ, yet both are needed for cooking — difference is not necessarily enmity.',
      },
    },
  },
  39: {
    modernShort:
      'Núi cao nước hiểm chắn đường — gặp bế tắc thì dừng, quay vào sửa mình và tìm trợ giúp.',
    keywords: ['trắc trở', 'dừng lại', 'sửa mình'],
    judgmentClassic:
      'Lợi về phương tây nam, không lợi phương đông bắc; lợi gặp người lớn, giữ chính thì tốt (蹇：利西南，不利東北，利見大人，貞吉).',
    imageClassic:
      'Trên núi có nước (đường lên núi lại gặp nước hiểm), là Kiển; người quân tử nhân đó quay lại tự xét mình mà sửa đức (山上有水，蹇；君子以反身修德).',
    modernDeep: {
      structureInsight:
        'Nước (Khảm, hiểm) ở trên, núi (Cấn, dừng) ở dưới: trước mặt là hiểm, dưới chân là vách núi chặn — tiến cũng khó, đứng cũng kẹt. "Kiển" là què, trắc trở.',
      transformInsight:
        'Đảo thành Giải (#40): bế tắc (Kiển) và tháo gỡ (Giải) là cặp gương — kẹt rồi sẽ có lúc cởi. Đối là Khuê (#38), hỗ là Vị Tế (#64).',
      binaryInsight:
        'Giá trị 20, ô (hàng 2 = Khảm, cột 4 = Cấn).',
      linePositions:
        'Hào 2 và hào 5 đều trung chính và ứng nhau: giữa trắc trở vẫn có trục để cậy (hào 5 ở vị tôn = "người lớn" nên tìm đến). Đó là ý "lợi gặp người lớn".',
      modernMapping:
        'Kiển là gặp trắc trở chồng chất, đường đi bị chặn. Phản ứng bản năng là cố vượt — nhưng quẻ khuyên ngược lại.\n\n"Quay lại tự xét mà sửa đức": gặp bế tắc thì dừng, soi lại chính mình trước, và tìm đúng người trợ giúp ("gặp người lớn") thay vì lao đầu vào tường. Biết dừng đúng lúc cũng là một loại tiến.',
    },
    en: {
      modernShort:
        'High mountain and dangerous water block the way — when stuck, halt, turn inward to mend yourself, and seek help.',
      keywords: ['obstruction', 'halting', 'self-correction'],
      judgmentGloss:
        'Furthering toward the southwest, not toward the northeast; furthering to see the great person, perseverance brings good fortune (利西南，不利東北，利見大人，貞吉).',
      imageGloss:
        'On the mountain there is water: Obstruction; the noble person accordingly turns inward to examine themselves and cultivate virtue (山上有水，蹇；君子以反身修德).',
      modernDeep: {
        structureInsight:
          'Water (Kan, danger) above, mountain (Gen, stopping) below: danger ahead, a mountain wall blocking below the feet — hard to advance, stuck to stand. "Jian" is lameness, obstruction.',
        transformInsight:
          'Reversed, it becomes Deliverance (#40): obstruction (Jian) and release (Xie) are a mirror pair — stuck now, loosed later. Its opposite is Opposition (#38); its nuclear is Before Completion (#64).',
        binaryInsight:
          'Value 20, cell (row 2 = Kan, col 4 = Gen).',
        linePositions:
          'Lines 2 and 5 are both central and correct and resonate: amid obstruction there is still an axis to lean on (line 5 in the honored place = the "great person" to seek). That is the sense of "furthering to see the great person."',
        modernMapping:
          'Jian is meeting obstacle upon obstacle, the road blocked. The instinct is to force through — but the hexagram advises the opposite.\n\n"Turn inward, examine yourself, cultivate virtue": when blocked, halt, look first at yourself, and seek the right helper ("the great person") rather than charging at the wall. To know when to stop is itself a kind of advance.',
      },
    },
  },
  40: {
    modernShort:
      'Băng tan, nút thắt được cởi — vượt qua khó khăn, mau giải quyết tồn đọng và biết tha thứ.',
    keywords: ['tháo gỡ', 'giải thoát', 'tha thứ'],
    judgmentClassic:
      'Lợi về phương tây nam; nếu không còn chỗ phải đi thì trở về là tốt, nếu còn chỗ phải đi thì đi sớm là tốt (解：利西南，无所往，其來復吉，有攸往夙吉).',
    imageClassic:
      'Sấm mưa nổi lên (bầu khí ngột ngạt được giải tỏa), là Giải; người quân tử nhân đó tha thứ lỗi lầm, khoan giảm tội (雷雨作，解；君子以赦過宥罪).',
    modernDeep: {
      structureInsight:
        'Sấm (Chấn) ở trên, nước/mưa (Khảm) ở dưới: sấm động và mưa rơi làm tan bầu khí ngột ngạt — "giải" là cởi bỏ, tháo gỡ, băng tan.',
      transformInsight:
        'Đảo của Kiển (#39): trắc trở (Kiển) được tháo gỡ thành Giải. Đối là Gia Nhân (#37), hỗ là Ký Tế (#63).',
      binaryInsight:
        'Giá trị 10, ô (hàng 1 = Chấn, cột 2 = Khảm).',
      linePositions:
        'Hào 2 ứng hào 5 — trục để cởi nút. Không hào nào vừa trung vừa chính: gỡ rối là việc cần làm dứt khoát và kịp thời, không cầu hoàn hảo. "Đi thì đi sớm".',
      modernMapping:
        'Giải là lúc nút thắt được cởi, khó khăn qua đi, băng tan: thời điểm xử lý nốt tồn đọng và bước tiếp.\n\nHai lời rất thực: việc còn dở thì giải quyết sớm; việc đã xong thì trở về nghỉ, đừng sinh sự. Và tinh thần "tha lỗi khoan tội" — sau khủng hoảng, rộng lượng để mở đường tới, không truy cùng.',
    },
    en: {
      modernShort:
        'The ice melts, the knot loosens — getting past hardship, quickly clearing what is pending and knowing how to forgive.',
      keywords: ['release', 'deliverance', 'forgiveness'],
      judgmentGloss:
        'Furthering toward the southwest; if there is no longer anywhere to go, to return is good; if there is still somewhere to go, to set out early is good (利西南，无所往，其來復吉，有攸往夙吉).',
      imageGloss:
        'Thunder and rain arise (the oppressive air is released): Deliverance; the noble person accordingly pardons faults and is lenient with offenses (雷雨作，解；君子以赦過宥罪).',
      modernDeep: {
        structureInsight:
          'Thunder (Zhen) above, water/rain (Kan) below: thunder stirring and rain falling dissolve the oppressive air — "Xie" is loosening, releasing, the thaw.',
        transformInsight:
          'The reversed of Obstruction (#39): obstruction (Jian) loosened into Deliverance (Xie). Its opposite is The Family (#37); its nuclear is After Completion (#63).',
        binaryInsight:
          'Value 10, cell (row 1 = Zhen, col 2 = Kan).',
        linePositions:
          'Line 2 resonates with line 5 — the axis for untying the knot. No line is both central and correct: untangling is work to be done decisively and promptly, not perfectly. "If you go, go early."',
        modernMapping:
          'Xie is when the knot loosens, hardship passes, the ice thaws: the time to clear up what is pending and move on.\n\nTwo very practical lines: unfinished matters, settle early; finished ones, return and rest, do not stir up trouble. And the spirit of "pardon faults, be lenient": after a crisis, be generous to open the way forward, not to hound to the end.',
      },
    },
  },
  41: {
    modernShort:
      'Giảm bớt cái dưới để bồi cái trên — hi sinh có chủ đích; bớt ham muốn thì được lợi lâu dài.',
    keywords: ['giảm bớt', 'hi sinh', 'tiết chế'],
    judgmentClassic:
      'Có lòng thành thì rất tốt, không lỗi, có thể giữ chính, lợi về chỗ có đi. Dùng vào việc gì? Hai bát cơm đạm bạc cũng đủ dâng cúng (損：有孚，元吉，无咎，可貞，利有攸往。曷之用，二簋可用享).',
    imageClassic:
      'Dưới núi có đầm (đầm khoét sâu làm núi hao đi), là Tổn; người quân tử nhân đó kiềm chế cơn giận, ngăn lòng dục (山下有澤，損；君子以懲忿窒欲).',
    modernDeep: {
      structureInsight:
        'Núi (Cấn) ở trên, đầm (Đoài) ở dưới: đầm sâu thêm thì đất núi hao đi — bớt cái dưới để bồi cái trên. "Tổn" là giảm bớt.',
      transformInsight:
        'Đảo thành Ích (#42): bớt đi (Tổn) và thêm vào (Ích) là cặp gương ngay cạnh nhau — giảm chỗ này để tăng chỗ kia. Đối là Hàm (#31), hỗ là Phục (#24).',
      binaryInsight:
        'Giá trị 35, ô (hàng 4 = Cấn, cột 3 = Đoài).',
      linePositions:
        'Cả ba cặp đều có ứng — bớt–thêm vẫn giữ được sự hô ứng trên dưới. "Hai bát cơm đạm cũng đủ cúng": cốt ở lòng thành, không ở lượng nhiều.',
      modernMapping:
        'Tổn là chủ động giảm bớt: cắt chi tiêu, bớt ham muốn, hi sinh cái trước mắt cho mục tiêu lớn hơn.\n\nĐiểm cốt: giảm đúng chỗ và có lòng thành thì "bớt" lại hóa lợi. "Kiềm giận, ngăn dục" — thứ đáng tổn nhất chính là cảm xúc và ham muốn thái quá; giảm chúng là được, không phải mất.',
    },
    en: {
      modernShort:
        'Reducing below to enrich above — sacrifice with purpose; cutting desire brings lasting gain.',
      keywords: ['decrease', 'sacrifice', 'restraint'],
      judgmentGloss:
        'With sincerity, supremely auspicious, no blame, one may persevere, furthering to have somewhere to go. Used for what? Even two simple bowls of grain suffice for the offering (有孚，元吉…二簋可用享).',
      imageGloss:
        'Below the mountain there is a lake: Decrease; the noble person accordingly curbs anger and restrains desire (山下有澤，損；君子以懲忿窒欲).',
      modernDeep: {
        structureInsight:
          'Mountain (Gen) above, lake (Dui) below: as the lake deepens, the mountain’s earth is worn away — reducing below to build up above. "Sun" is to decrease.',
        transformInsight:
          'Reversed, it becomes Increase (#42): decrease (Sun) and increase (Yi) are a mirror pair set side by side — reduce here to add there. Its opposite is Influence (#31); its nuclear is Return (#24).',
        binaryInsight:
          'Value 35, cell (row 4 = Gen, col 3 = Dui).',
        linePositions:
          'All three pairs resonate — even in decrease and increase, the correspondence of above and below is kept. "Two simple bowls suffice for the offering": the core is sincerity, not quantity.',
        modernMapping:
          'Sun is deliberately reducing: cutting spending, trimming desire, sacrificing the immediate for a larger goal.\n\nThe crux: reduce in the right place and with sincerity, and "decrease" turns into gain. "Curb anger, restrain desire" — what most deserves reducing is excessive emotion and desire; to reduce them is to gain, not to lose.',
      },
    },
  },
  42: {
    modernShort:
      'Bớt trên giúp dưới — thời được tăng ích; rộng lượng và hành động kịp thời thì lợi lớn.',
    keywords: ['tăng ích', 'rộng lượng', 'kịp thời'],
    judgmentClassic:
      'Lợi về chỗ có đi, lợi vượt sông lớn (益：利有攸往，利涉大川).',
    imageClassic:
      'Gió và sấm (cùng tăng thế cho nhau), là Ích; người quân tử nhân đó thấy điều thiện thì làm theo, có lỗi thì sửa (風雷，益；君子以見善則遷，有過則改).',
    modernDeep: {
      structureInsight:
        'Gió (Tốn) ở trên, sấm (Chấn) ở dưới: gió thổi mạnh thêm sấm, sấm dậy thêm gió — hai bên tăng thế cho nhau. "Ích" là thêm vào, tăng ích.',
      transformInsight:
        'Đảo của Tổn (#41): bớt trên giúp dưới (Ích) so với bớt dưới giúp trên (Tổn). Đối là Hằng (#32), hỗ là Bác (#23).',
      binaryInsight:
        'Giá trị 49, ô (hàng 6 = Tốn, cột 1 = Chấn).',
      linePositions:
        'Hào 2 và hào 5 đều trung chính và ứng nhau, cả ba cặp đều ứng — thời được tăng ích, trên dưới đều thuận. Bớt từ trên bồi xuống dưới, nên dân được lợi.',
      modernMapping:
        'Ích là thời được tăng thêm: nguồn lực dồi dào, gió thuận. Hợp để hành động ("lợi có chỗ đi", "vượt sông lớn").\n\nCách giữ cái lợi rất đẹp: "thấy thiện thì theo, có lỗi thì sửa". Được thêm là dịp để hoàn thiện mình nhanh hơn và rộng lượng san xuống dưới — tăng ích cho người thì cái ích mới bền.',
    },
    en: {
      modernShort:
        'Reducing above to help below — a time of increase; generosity and timely action bring great gain.',
      keywords: ['increase', 'generosity', 'timeliness'],
      judgmentGloss:
        'Furthering to have somewhere to go, furthering to cross the great water (利有攸往，利涉大川).',
      imageGloss:
        'Wind and thunder (each strengthening the other) make Increase; the noble person accordingly, seeing good, moves toward it, and having faults, corrects them (風雷，益；君子以見善則遷，有過則改).',
      modernDeep: {
        structureInsight:
          'Wind (Xun) above, thunder (Zhen) below: wind strengthens the thunder, thunder rouses more wind — each adding to the other. "Yi" is to add, to increase.',
        transformInsight:
          'The reversed of Decrease (#41): reducing above to help below (Yi) versus reducing below to help above (Sun). Its opposite is Duration (#32); its nuclear is Splitting Apart (#23).',
        binaryInsight:
          'Value 49, cell (row 6 = Xun, col 1 = Zhen).',
        linePositions:
          'Lines 2 and 5 are both central and correct and resonate, and all three pairs resonate — a time of increase, above and below both favorable. Reducing from above to build up below, so the people gain.',
        modernMapping:
          'Yi is a time of gaining more: resources abundant, winds favorable. Good for action ("furthering to have somewhere to go," "cross the great water").\n\nA beautiful way to keep the gain: "see good and move to it, have faults and correct them." To be given more is a chance to improve yourself faster and to be generous downward — benefit others and the gain becomes lasting.',
      },
    },
  },
  43: {
    modernShort:
      'Năm dương đẩy bật một âm — dứt khoát loại bỏ cái xấu cuối cùng, nhưng minh bạch chứ không bạo.',
    keywords: ['dứt điểm', 'quyết đoán', 'minh bạch'],
    judgmentClassic:
      'Nêu rõ ở sân vua; thành thật hô hào, có điều nguy; tự răn từ ấp mình, không lợi việc binh đao, lợi về chỗ có đi (夬：揚于王庭，孚號有厲，告自邑，不利即戎，利有攸往).',
    imageClassic:
      'Nước đầm dâng lên tận trời (sắp vỡ tràn), là Quải; người quân tử nhân đó ban lộc xuống dưới, kiêng việc tích đức để cậy công (澤上于天，夬；君子以施祿及下，居德則忌).',
    modernDeep: {
      structureInsight:
        'Đầm (Đoài) ở trên, trời (Càn) ở dưới: năm hào dương dâng lên đẩy bật một hào âm cuối cùng ở đỉnh — "quải" là quyết, dứt khoát loại bỏ cái xấu còn sót.',
      transformInsight:
        'Đảo thành Cấu (#44): dứt cái âm cuối (Quải) thì ngay sau một âm mới sinh (Cấu) — nhắc chu kỳ luôn tái diễn. Đối là Bác (#23, ảnh gương), hỗ là Càn (#1).',
      binaryInsight:
        'Giá trị 31, ô (hàng 3 = Đoài, cột 7 = Càn) — năm hào dương đẩy một âm ở đỉnh (Quải thuộc 12 Tích quái).',
      linePositions:
        'Hào 5 (dương, đắc trung) dẫn đầu việc trừ hào âm trên cùng (hào 6). "Không lợi việc binh đao": dứt cái xấu phải bằng minh bạch ("nêu ở sân vua"), không bằng bạo lực.',
      modernMapping:
        'Quải là lúc dứt điểm cái xấu cuối cùng: thế đã áp đảo, chỉ còn một mầm tệ cần loại.\n\nNhưng cách làm mới là điểm: công khai, minh bạch ("nêu ở sân vua"), tự răn mình trước, tránh dùng vũ lực thô bạo. Dứt khoát mà văn minh — thắng cái xấu mà không trở nên xấu.',
    },
    en: {
      modernShort:
        'Five yang pushing out one yin — resolutely eliminating the last evil, but by openness, not violence.',
      keywords: ['resolution', 'decisiveness', 'transparency'],
      judgmentGloss:
        'Proclaimed at the king’s court; a sincere outcry, there is danger; warn from one’s own town, it does not further to resort to arms, furthering to have somewhere to go (揚于王庭，孚號有厲…利有攸往).',
      imageGloss:
        'The lake’s water rises to the very heavens (about to burst): Break-through; the noble person accordingly dispenses benefits to those below and shuns hoarding virtue for merit (澤上于天，夬；君子以施祿及下，居德則忌).',
      modernDeep: {
        structureInsight:
          'Lake (Dui) above, heaven (Qian) below: five yang lines surge up to push out the last single yin line at the top — "Guai" is resolution, decisively removing the remaining evil.',
        transformInsight:
          'Reversed, it becomes Coming to Meet (#44): cut off the last yin (Guai) and right after, a new yin is born (Gou) — a reminder that the cycle always recurs. Its opposite is Splitting Apart (#23, the mirror); its nuclear is Heaven (#1).',
        binaryInsight:
          'Value 31, cell (row 3 = Dui, col 7 = Qian) — five yang pushing one yin at the top (Guai is one of the twelve sovereign hexagrams).',
        linePositions:
          'Line 5 (yang, central) leads the removal of the topmost yin line (line 6). "It does not further to resort to arms": cut off the bad by openness ("proclaim at the court"), not by violence.',
        modernMapping:
          'Guai is the moment of finishing off the last evil: the tide has turned overwhelmingly, only one bad seed remains to remove.\n\nBut the method is the point: openly and transparently ("proclaim at the court"), warning yourself first, avoiding brute force. Decisive yet civilized — defeat the evil without becoming evil.',
      },
    },
  },
  44: {
    modernShort:
      'Một âm len vào dưới năm dương — mầm cám dỗ chớm nở; cảnh giác sớm trước điều tưởng nhỏ.',
    keywords: ['gặp gỡ', 'cảnh giác', 'mầm mống'],
    judgmentClassic:
      'Người nữ cường thịnh (lấn át); chớ cưới người nữ ấy (姤：女壯，勿用取女).',
    imageClassic:
      'Dưới trời có gió (gió chạm tới khắp muôn vật), là Cấu; bậc vua nhân đó ban mệnh lệnh, hiểu dụ bốn phương (天下有風，姤；后以施命誥四方).',
    modernDeep: {
      structureInsight:
        'Trời (Càn) ở trên, gió (Tốn) ở dưới: một hào âm vừa len vào dưới năm hào dương — "cấu" là gặp gỡ bất ngờ, mầm âm mới sinh giữa lúc thịnh dương.',
      transformInsight:
        'Đảo của Quải (#43): vừa dứt một âm (Quải) thì một âm khác lại sinh (Cấu). Đối là Phục (#24, ảnh gương — một dương sinh), hỗ là Càn (#1).',
      binaryInsight:
        'Giá trị 62, ô (hàng 7 = Càn, cột 6 = Tốn) — một hào âm mới sinh ở đáy (Cấu thuộc 12 Tích quái, ứng Hạ chí).',
      linePositions:
        'Hào 5 (dương, đắc trung) là sức chính; nhưng hào âm sơ vừa nhú mới là điều phải để mắt. "Người nữ cường, chớ cưới": cảnh giác cái mầm tưởng nhỏ nhưng có sức lan.',
      modernMapping:
        'Cấu là cuộc gặp gỡ bất ngờ, và là mầm cám dỗ/sự cố chớm nở giữa lúc đang thịnh: một sai lệch nhỏ vừa xuất hiện.\n\nBài học: nhận ra và xử lý sớm cái mầm tưởng vô hại. "Một âm" hôm nay nếu để yên sẽ lớn dần đẩy lùi cả khối dương. Cảnh giác sớm, đừng đợi nó "cường" mới lo.',
    },
    en: {
      modernShort:
        'One yin slips in beneath five yang — the sprout of temptation just budding; be wary early of what seems small.',
      keywords: ['meeting', 'vigilance', 'the sprout'],
      judgmentGloss:
        'The woman is powerful (overbearing); do not marry such a woman (女壯，勿用取女).',
      imageGloss:
        'Under heaven there is wind (touching all things): Coming to Meet; the ruler accordingly issues commands and proclaims them to the four quarters (天下有風，姤；后以施命誥四方).',
      modernDeep: {
        structureInsight:
          'Heaven (Qian) above, wind (Xun) below: a single yin line has just slipped in beneath five yang — "Gou" is an unexpected meeting, a new yin sprout born amid flourishing yang.',
        transformInsight:
          'The reversed of Break-through (#43): just as one yin is cut off (Guai), another yin is born (Gou). Its opposite is Return (#24, the mirror — one yang born); its nuclear is Heaven (#1).',
        binaryInsight:
          'Value 62, cell (row 7 = Qian, col 6 = Xun) — a single yin line newly born at the base (Gou is one of the twelve sovereign hexagrams, matching the summer solstice).',
        linePositions:
          'Line 5 (yang, central) is the main strength; but the newly sprouted bottom yin line is what to watch. "A powerful woman, do not marry": beware the sprout that seems small yet has power to spread.',
        modernMapping:
          'Gou is an unexpected encounter, and a sprout of temptation or trouble budding amid flourishing: a small deviation just appearing.\n\nThe lesson: recognize and handle the seemingly harmless sprout early. The "one yin" of today, left alone, grows and pushes back the whole mass of yang. Be wary early — do not wait until it is "powerful" to worry.',
      },
    },
  },
  45: {
    modernShort:
      'Quy tụ đông người — cần trung tâm chính danh và mục tiêu chung để đám đông thành sức mạnh.',
    keywords: ['tụ họp', 'quy tụ', 'chính danh'],
    judgmentClassic:
      'Hanh thông. Vua đến nhà tông miếu; lợi gặp người lớn, hanh thông, lợi về giữ chính; dùng vật tế lớn thì tốt, lợi về chỗ có đi (萃：亨。王假有廟，利見大人，亨，利貞。用大牲吉，利有攸往).',
    imageClassic:
      'Nước đầm dâng trên mặt đất (tụ lại), là Tụy; người quân tử nhân đó sửa sang khí giới, phòng điều bất trắc (澤上于地，萃；君子以除戎器，戒不虞).',
    modernDeep: {
      structureInsight:
        'Đầm (Đoài) ở trên, đất (Khôn) ở dưới: nước tụ trên mặt đất thành ao hồ — "tụy" là tụ họp, quy tụ đông người.',
      transformInsight:
        'Đảo thành Thăng (#46): tụ họp (Tụy) rồi từ đó đi lên (Thăng). Đối là Đại Súc (#26), hỗ là Tiệm (#53).',
      binaryInsight:
        'Giá trị 24, ô (hàng 3 = Đoài, cột 0 = Khôn).',
      linePositions:
        'Hào 2 và hào 5 đều trung chính và ứng nhau: hào 5 ở vị tôn là trung tâm chính danh để mọi người tụ về. "Vua đến tông miếu", "lợi gặp người lớn": tụ họp cần một biểu tượng/lý do chung trang nghiêm.',
      modernMapping:
        'Tụy là quy tụ đông người: hội nhóm, tổ chức, phong trào hình thành. Để đám đông thành sức mạnh chứ không thành đám hỗn loạn, cần trung tâm chính danh và mục tiêu chung.\n\n"Sửa khí giới phòng bất trắc": chỗ đông người tụ cũng là chỗ dễ sinh biến — quy tụ phải đi kèm phòng bị và kỷ cương.',
    },
    en: {
      modernShort:
        'Gathering a multitude — it needs a rightful center and a shared aim to turn a crowd into strength.',
      keywords: ['gathering', 'congregating', 'legitimacy'],
      judgmentGloss:
        'Pervading. The king approaches his ancestral temple; furthering to see the great person, pervading, furthering through perseverance; using a great offering is good, furthering to have somewhere to go (王假有廟…利有攸往).',
      imageGloss:
        'The lake’s water rises over the earth (gathering): Gathering Together; the noble person accordingly overhauls their weapons to guard against the unforeseen (澤上于地，萃；君子以除戎器，戒不虞).',
      modernDeep: {
        structureInsight:
          'Lake (Dui) above, earth (Kun) below: water gathering on the earth into a pool — "Cui" is gathering, congregating a multitude.',
        transformInsight:
          'Reversed, it becomes Pushing Upward (#46): having gathered (Cui), one then rises from there (Sheng). Its opposite is the Taming Power of the Great (#26); its nuclear is Development (#53).',
        binaryInsight:
          'Value 24, cell (row 3 = Dui, col 0 = Kun).',
        linePositions:
          'Lines 2 and 5 are both central and correct and resonate: line 5 in the honored place is the rightful center around which all gather. "The king approaches the temple," "furthering to see the great person": gathering needs a solemn shared symbol or reason.',
        modernMapping:
          'Cui is gathering a multitude: groups, organizations, movements forming. For a crowd to become strength rather than chaos, it needs a rightful center and a shared aim.\n\n"Overhaul weapons against the unforeseen": where many gather, trouble easily arises too — gathering must go with preparedness and discipline.',
      },
    },
  },
  46: {
    modernShort:
      'Mầm vươn lên xuyên đất — tiến bộ dần đều; kiên trì từng bước thì lên cao thuận lợi.',
    keywords: ['đi lên', 'tiến dần', 'kiên trì'],
    judgmentClassic:
      'Rất hanh thông; nên đi gặp người lớn, chớ lo, tiến về phương nam thì tốt (升：元亨，用見大人，勿恤，南征吉).',
    imageClassic:
      'Trong lòng đất nảy cây, là Thăng; người quân tử nhân đó thuận theo đức, tích cái nhỏ để thành cao lớn (地中生木，升；君子以順德，積小以高大).',
    modernDeep: {
      structureInsight:
        'Đất (Khôn) ở trên, gió/cây (Tốn) ở dưới: cây từ trong đất vươn lên dần — "thăng" là đi lên, tiến bộ tuần tự.',
      transformInsight:
        'Đảo của Tụy (#45): tụ họp (Tụy) tạo đà đi lên (Thăng). Đối là Vô Vọng (#25), hỗ là Quy Muội (#54).',
      binaryInsight:
        'Giá trị 6, ô (hàng 0 = Khôn, cột 6 = Tốn).',
      linePositions:
        'Hào 2 ứng hào 5: sức dưới được trên đón, nên lên thuận. Không hào nào vừa trung vừa chính — lên cao là việc của tích lũy bền bỉ, không nhờ một bước nhảy hoàn hảo.',
      modernMapping:
        'Thăng là đi lên dần đều như cây mọc: tiến bộ từng bước, không nhảy vọt. "Tích cái nhỏ để thành cao lớn" — đúng quy luật của trưởng thành thật.\n\n"Chớ lo, đi gặp người lớn": lúc đang lên, mạnh dạn tiến và tìm người dẫn dắt; đừng tự nghi ngờ. Nhưng cái gốc vẫn là kiên trì bồi đắp đều đặn.',
    },
    en: {
      modernShort:
        'A sprout pushing up through the earth — steady, gradual progress; persist step by step and you rise favorably.',
      keywords: ['ascending', 'gradual progress', 'perseverance'],
      judgmentGloss:
        'Supremely pervading; one should go to see the great person, do not worry, to advance toward the south is good (元亨，用見大人，勿恤，南征吉).',
      imageGloss:
        'Within the earth wood grows: Pushing Upward; the noble person accordingly follows virtue, accumulating the small to become high and great (地中生木，升；君子以順德，積小以高大).',
      modernDeep: {
        structureInsight:
          'Earth (Kun) above, wind/wood (Xun) below: a tree rising up from within the earth — "Sheng" is ascending, orderly, step-by-step progress.',
        transformInsight:
          'The reversed of Gathering Together (#45): gathering (Cui) builds the momentum to rise (Sheng). Its opposite is Innocence (#25); its nuclear is The Marrying Maiden (#54).',
        binaryInsight:
          'Value 6, cell (row 0 = Kun, col 6 = Xun).',
        linePositions:
          'Line 2 resonates with line 5: the force below is welcomed by above, so the rise is smooth. No line is both central and correct — rising high is a matter of steady accumulation, not one perfect leap.',
        modernMapping:
          'Sheng is rising steadily like a growing tree: progress step by step, not by leaps. "Accumulate the small to become high and great" — the true law of real growth.\n\n"Do not worry, go to see the great person": while rising, advance boldly and seek a mentor; do not doubt yourself. But the root is still patient, steady accumulation.',
      },
    },
  },
  47: {
    modernShort:
      'Cạn kiệt và bị vây — lúc cùng quẫn, giữ chí và lời ít việc thật, đừng than để vượt qua.',
    keywords: ['khốn cùng', 'giữ chí', 'bền gan'],
    judgmentClassic:
      'Hanh thông; người lớn giữ chính thì tốt, không lỗi; lúc này có nói cũng chẳng ai tin (困：亨，貞，大人吉，无咎，有言不信).',
    imageClassic:
      'Đầm cạn hết nước, là Khốn; người quân tử nhân đó dám liều cả tính mạng để đạt chí của mình (澤无水，困；君子以致命遂志).',
    modernDeep: {
      structureInsight:
        'Đầm (Đoài) ở trên, nước (Khảm) ở dưới: nước rút xuống dưới, đầm cạn khô — "khốn" là khốn cùng, cạn kiệt, bị vây.',
      transformInsight:
        'Đảo thành Tỉnh (#48): cạn kiệt bị vây (Khốn) và giếng nuôi người (Tỉnh) là cặp gương — cùng về nước, một bên thiếu, một bên là nguồn. Đối là Bí (#22), hỗ là Gia Nhân (#37).',
      binaryInsight:
        'Giá trị 26, ô (hàng 3 = Đoài, cột 2 = Khảm).',
      linePositions:
        'Hào 5 (dương, đắc trung) là chỗ giữ chí giữa khốn. "Có nói chẳng ai tin": lúc cùng quẫn, biện bạch vô ích — giữ chí bằng việc làm, không bằng lời.',
      modernMapping:
        'Khốn là lúc cạn kiệt và bị vây: hết nguồn lực, bị hiểu lầm, nói không ai nghe. Giai đoạn thử bản lĩnh nhất.\n\nLời khuyên rất rắn rỏi: lúc này "có lời cũng không ai tin" — nên ngừng than, ngừng phân bua, dồn sức giữ chí và làm. Người lớn giữ được chính khí qua cơn khốn thì "hanh" — bĩ cực sẽ thái lai.',
    },
    en: {
      modernShort:
        'Exhausted and hemmed in — in extremity, keep your resolve, few words and real deeds, do not lament, to get through.',
      keywords: ['exhaustion', 'keeping resolve', 'fortitude'],
      judgmentGloss:
        'Pervading; for the great person, perseverance brings good fortune, no blame; at such a time, even if one speaks, no one believes (亨，貞，大人吉，无咎，有言不信).',
      imageGloss:
        'A lake with no water: Oppression; the noble person accordingly stakes their very life to fulfill their aim (澤无水，困；君子以致命遂志).',
      modernDeep: {
        structureInsight:
          'Lake (Dui) above, water (Kan) below: the water has drained away below, the lake dried up — "Kun" is extremity, exhaustion, being hemmed in.',
        transformInsight:
          'Reversed, it becomes the Well (#48): exhaustion hemmed in (Kun) and the well that nourishes (Jing) are a mirror pair — both about water, one lacking, the other a source. Its opposite is Grace (#22); its nuclear is The Family (#37).',
        binaryInsight:
          'Value 26, cell (row 3 = Dui, col 2 = Kan).',
        linePositions:
          'Line 5 (yang, central) is where one holds resolve amid extremity. "Even if one speaks, no one believes": in extremity, arguing is useless — keep your resolve by deeds, not words.',
        modernMapping:
          'Kun is being exhausted and hemmed in: out of resources, misunderstood, speaking and unheard. The phase that most tests one’s mettle.\n\nVery firm advice: now "even words are not believed" — so stop lamenting, stop pleading, pour your strength into holding your resolve and acting. The great person who keeps their integrity through extremity "pervades" — at the depth of standstill, peace returns.',
      },
    },
  },
  48: {
    modernShort:
      'Giếng nuôi người không cạn — nguồn lực chung cần giữ sạch và sửa sang để ai cũng dùng được.',
    keywords: ['nguồn lực', 'nuôi chung', 'duy trì'],
    judgmentClassic:
      'Dời ấp chứ không dời giếng; không mất không được, người qua kẻ lại đều dùng giếng. Gần tới nơi mà chưa kịp kéo nước lên, vỡ mất cái bình thì xấu (井：改邑不改井，无喪无得，往來井井。汔至亦未繘井，羸其瓶，凶).',
    imageClassic:
      'Trên gỗ có nước (gàu gỗ kéo nước lên), là Tỉnh; người quân tử nhân đó khuyến khích dân siêng năng giúp đỡ lẫn nhau (木上有水，井；君子以勞民勸相).',
    modernDeep: {
      structureInsight:
        'Nước (Khảm) ở trên, gió/gỗ (Tốn) ở dưới: gàu gỗ thả xuống kéo nước lên — tượng cái giếng nuôi người, nguồn lực chung không cạn.',
      transformInsight:
        'Đảo của Khốn (#47): cạn kiệt (Khốn) so với nguồn không cạn (Tỉnh). Đối là Phệ Hạp (#21), hỗ là Khuê (#38).',
      binaryInsight:
        'Giá trị 22, ô (hàng 2 = Khảm, cột 6 = Tốn).',
      linePositions:
        'Hào 5 (dương, đắc trung) là mạch nước trong giữa giếng — nguồn để mọi người múc. "Dời ấp không dời giếng": cái cốt (nguồn chung) thì bền cố định, dù người đến kẻ đi.',
      modernMapping:
        'Tỉnh là nguồn lực chung nuôi mọi người: hạ tầng, tri thức, định chế, văn hóa — "dời ấp chứ không dời giếng", cái gốc vẫn ở đó cho ai cũng dùng.\n\nNhưng giếng cần giữ sạch và sửa sang, và phải kéo được nước lên: "gần tới mà làm vỡ bình thì xấu" — bỏ dở ngay khâu cuối thì công cốc. Duy trì nguồn chung là việc liên tục, không phải làm một lần.',
    },
    en: {
      modernShort:
        'The well that nourishes never runs dry — a shared resource must be kept clean and maintained so all can draw from it.',
      keywords: ['resource', 'common nourishment', 'upkeep'],
      judgmentGloss:
        'The town may be moved, but not the well; without loss and without gain, comers and goers all use it. If, nearly there, one has not yet drawn the water up and breaks the jug, misfortune (改邑不改井…羸其瓶，凶).',
      imageGloss:
        'Above the wood is water (a wooden bucket drawing water up): the Well; the noble person accordingly encourages the people to work and help one another (木上有水，井；君子以勞民勸相).',
      modernDeep: {
        structureInsight:
          'Water (Kan) above, wind/wood (Xun) below: the wooden bucket lowered to draw water up — the image of the well that nourishes, a shared resource that does not run dry.',
        transformInsight:
          'The reversed of Oppression (#47): exhaustion (Kun) versus the inexhaustible source (Jing). Its opposite is Biting Through (#21); its nuclear is Opposition (#38).',
        binaryInsight:
          'Value 22, cell (row 2 = Kan, col 6 = Xun).',
        linePositions:
          'Line 5 (yang, central) is the clear spring at the heart of the well — the source from which all draw. "Move the town but not the well": the core (the shared source) is fixed and enduring, though people come and go.',
        modernMapping:
          'Jing is the shared resource that nourishes all: infrastructure, knowledge, institutions, culture — "move the town but not the well," the root stays there for all to use.\n\nBut the well must be kept clean and maintained, and the water actually drawn up: "nearly there and you break the jug, misfortune" — to quit at the last step wastes it all. Sustaining a common source is continuous work, not a one-time act.',
      },
    },
  },
  49: {
    modernShort:
      'Thay cũ đổi mới — khi đã chín muồi và được tin, mạnh dạn cải tổ tận gốc.',
    keywords: ['cách mạng', 'đổi mới', 'cải tổ'],
    judgmentClassic:
      'Đến ngày Tỵ thì có lòng tin theo; rất hanh thông, lợi về giữ chính, hối hận tiêu tan (革：巳日乃孚，元亨，利貞，悔亡).',
    imageClassic:
      'Trong đầm có lửa (nước lửa khắc nhau, tất phải đổi), là Cách; người quân tử nhân đó làm lịch pháp để rõ thời tiết (澤中有火，革；君子以治歷明時).',
    modernDeep: {
      structureInsight:
        'Đầm (Đoài, nước) ở trên, lửa (Ly) ở dưới: nước và lửa cùng chỗ, khắc nhau, tất phải biến đổi — "cách" là thay cũ đổi mới, cách mạng.',
      transformInsight:
        'Đảo thành Đỉnh (#50): phá cái cũ (Cách) rồi lập cái mới và nuôi dưỡng (Đỉnh) — cặp "cách–đỉnh" kinh điển. Đối là Mông (#4), hỗ là Cấu (#44).',
      binaryInsight:
        'Giá trị 29, ô (hàng 3 = Đoài, cột 5 = Ly).',
      linePositions:
        'Hào 2 và hào 5 đều trung chính và ứng nhau: cải tổ lớn cần một trục chính danh, đáng tin. "Đến ngày Tỵ mới tin": cách mạng phải đợi chín muồi và được lòng người, không vội.',
      modernMapping:
        'Cách là thay cũ đổi mới tận gốc: cải tổ, chuyển đổi lớn khi cái cũ đã hết hợp thời (như nước–lửa không thể chung).\n\nĐiều kiện sống còn: thời điểm chín ("đến ngày mới tin") và niềm tin của người. Đổi mới quá sớm hay áp đặt thì hỏng; đúng thời, chính danh, được tin thì "hối vong" — sạch hối tiếc.',
    },
    en: {
      modernShort:
        'Casting off the old for the new — when it is ripe and you are trusted, boldly reform to the root.',
      keywords: ['revolution', 'renewal', 'reform'],
      judgmentGloss:
        'On the day Si, one is then believed; supremely pervading, furthering through perseverance, remorse vanishes (巳日乃孚，元亨，利貞，悔亡).',
      imageGloss:
        'Within the lake there is fire (water and fire conquer each other, so change must come): Revolution; the noble person accordingly regulates the calendar to make the seasons clear (澤中有火，革；君子以治歷明時).',
      modernDeep: {
        structureInsight:
          'Lake (Dui, water) above, fire (Li) below: water and fire together, conquering each other, must transform — "Ge" is casting off the old for the new, revolution.',
        transformInsight:
          'Reversed, it becomes the Cauldron (#50): breaking the old (Ge) then establishing and nourishing the new (Ding) — the classic "revolution and cauldron" pair. Its opposite is Youthful Folly (#4); its nuclear is Coming to Meet (#44).',
        binaryInsight:
          'Value 29, cell (row 3 = Dui, col 5 = Li).',
        linePositions:
          'Lines 2 and 5 are both central and correct and resonate: great reform needs a rightful, trusted axis. "Believed only on the day Si": revolution must await ripeness and win people’s hearts, not be rushed.',
        modernMapping:
          'Ge is casting off the old for the new at the root: reform, major transition when the old no longer fits (like water and fire that cannot share a place).\n\nThe make-or-break conditions: ripe timing ("believed only when the day comes") and people’s trust. Reform too early, or imposed, fails; timely, rightful, and trusted, it brings "remorse gone" — a clean break, free of regret.',
      },
    },
  },
  50: {
    modernShort:
      'Vạc nấu biến nguyên liệu thành tinh hoa — nuôi dưỡng và chuyển hoá, ổn định để tạo giá trị mới.',
    keywords: ['chuyển hoá', 'nuôi dưỡng', 'ổn định'],
    judgmentClassic:
      'Rất tốt lành, hanh thông (鼎：元吉，亨).',
    imageClassic:
      'Trên gỗ có lửa (đun cái vạc), là Đỉnh; người quân tử nhân đó giữ ngôi vị cho ngay chính, vững vàng gánh mệnh (木上有火，鼎；君子以正位凝命).',
    modernDeep: {
      structureInsight:
        'Lửa (Ly) ở trên, gió/gỗ (Tốn) ở dưới: gỗ nuôi lửa nấu cái vạc — tượng cái đỉnh (vạc) nấu chín, biến nguyên liệu thô thành tinh hoa.',
      transformInsight:
        'Đảo của Cách (#49): phá cũ (Cách) rồi lập mới và nuôi dưỡng (Đỉnh). Đối là Truân (#3), hỗ là Quải (#43).',
      binaryInsight:
        'Giá trị 46, ô (hàng 5 = Ly, cột 6 = Tốn). Hình quẻ trông như cái vạc: chân, bụng, tai, đòn khiêng.',
      linePositions:
        'Hào 5 (âm, đắc trung) là "tai vạc" mềm để xỏ đòn nhấc — đức nhu ở vị tôn điều phối việc lớn; hào 2 dương đầy đặn là "bụng vạc" chứa thức ăn. Phối cương–nhu để nấu thành.',
      modernMapping:
        'Đỉnh là chuyển hóa và nuôi dưỡng: biến nguyên liệu thô (người, ý tưởng, nguồn lực) thành giá trị chín — như vạc nấu cơm thành món ăn.\n\nĐi liền sau Cách: phá cái cũ xong phải LẬP cái mới và nuôi nó. "Giữ ngôi chính, vững gánh mệnh": chuyển hóa bền cần sự ổn định và chính danh, không lật đật.',
    },
    en: {
      modernShort:
        'The cauldron cooking raw material into refined essence — nourishing and transforming, stabilizing to create new value.',
      keywords: ['transformation', 'nourishment', 'stability'],
      judgmentGloss:
        'Supremely auspicious, pervading (元吉，亨).',
      imageGloss:
        'Above the wood is fire (cooking the cauldron): the Cauldron; the noble person accordingly makes their position correct and firmly holds their charge (木上有火，鼎；君子以正位凝命).',
      modernDeep: {
        structureInsight:
          'Fire (Li) above, wind/wood (Xun) below: wood feeds the fire that cooks the cauldron — the image of the ding (cauldron), transforming raw material into refined essence.',
        transformInsight:
          'The reversed of Revolution (#49): breaking the old (Ge) then establishing and nourishing the new (Ding). Its opposite is Difficulty at the Beginning (#3); its nuclear is Break-through (#43).',
        binaryInsight:
          'Value 46, cell (row 5 = Li, col 6 = Xun). The figure resembles a cauldron: legs, belly, ears, and carrying-bar.',
        linePositions:
          'Line 5 (yin, central) is the soft "ear of the cauldron" for the carrying-bar — yielding virtue in the honored place coordinating the great work; the full yang line 2 is the "belly" holding the food. Firm and soft combine to cook it through.',
        modernMapping:
          'Ding is transformation and nourishment: turning raw material (people, ideas, resources) into ripened value — as a cauldron cooks rice into a meal.\n\nComing right after Revolution: having broken the old, one must ESTABLISH the new and nourish it. "Make your position correct, firmly hold your charge": lasting transformation needs stability and legitimacy, not haste.',
      },
    },
  },
  51: {
    modernShort:
      'Sấm nối sấm gây kinh động — biến cố đánh thức; giữ bình tĩnh giữa rung chuyển thì hoá lành.',
    keywords: ['chấn động', 'đánh thức', 'bình tĩnh'],
    judgmentClassic:
      'Hanh thông. Sấm đến làm sợ run, rồi lại nói cười vui vẻ; sấm vang trăm dặm mà không đánh rơi thìa cúng, chén rượu (震：亨。震來虩虩，笑言啞啞，震驚百里，不喪匕鬯).',
    imageClassic:
      'Sấm nối tiếp sấm, là Chấn; người quân tử nhân lúc sợ hãi mà tu sửa, xét lại mình (洊雷，震；君子以恐懼修省).',
    modernDeep: {
      structureInsight:
        'Sấm (Chấn) chồng lên sấm (Chấn): chấn động nối chấn động. Mỗi quẻ đơn có hào dương bật lên ở đáy — tượng cú sốc, biến cố làm rung chuyển.',
      transformInsight:
        'Đối là Thuần Tốn (#57): chấn động mạnh (Chấn) so với thẩm thấu nhẹ (Tốn). Đảo là Thuần Cấn (#52, dừng lại). Hỗ là Kiển (#39).',
      binaryInsight:
        'Giá trị 9, ô (hàng 1 = Chấn, cột 1 = Chấn). Một trong tám quẻ thuần.',
      linePositions:
        'Hào dương ở vị sơ và vị 4 là nguồn chấn; hào 2 đắc trung giữ được bình tĩnh. "Không đánh rơi thìa rượu cúng": giữa cơn rung chuyển vẫn không buông việc đang làm — đó là bản lĩnh.',
      modernMapping:
        'Chấn là cú sốc, biến cố bất ngờ làm mọi thứ rung chuyển: tin dữ, khủng hoảng, thay đổi đột ngột.\n\nQuẻ không bảo né — nó dạy phản ứng: thoạt đầu sợ run là tự nhiên, nhưng giữ được bình tĩnh ("không rơi thìa rượu") thì rồi "nói cười vui vẻ". Sâu hơn: dùng cú sốc làm dịp "tu sửa xét mình" — biến cố là hồi chuông thức tỉnh.',
    },
    en: {
      modernShort:
        'Thunder upon thunder, a shock — a jolt that awakens; keep calm amid the upheaval and it turns to good.',
      keywords: ['shock', 'awakening', 'composure'],
      judgmentGloss:
        'Pervading. Shock comes — fear and trembling; then laughter and words. The thunder terrifies for a hundred miles, yet one does not drop the sacrificial spoon and chalice (震來虩虩，笑言啞啞，震驚百里，不喪匕鬯).',
      imageGloss:
        'Thunder rolling upon thunder makes the Arousing; the noble person accordingly, in fear and trembling, sets themselves in order and examines themselves (洊雷，震；君子以恐懼修省).',
      modernDeep: {
        structureInsight:
          'Thunder (Zhen) upon thunder (Zhen): shock upon shock. Each trigram has a yang line bursting up at the base — the image of a jolt, an event that shakes everything.',
        transformInsight:
          'Its opposite is the Gentle (#57): strong shock (Zhen) versus gentle penetration (Xun). Its reversed is Keeping Still (#52, halting). Its nuclear is Obstruction (#39).',
        binaryInsight:
          'Value 9, cell (row 1 = Zhen, col 1 = Zhen). One of the eight doubled hexagrams.',
        linePositions:
          'The yang lines at places 1 and 4 are the source of the shock; line 2, central, keeps its composure. "Not dropping the sacrificial spoon": amid the upheaval, not letting go of the task at hand — that is real steadiness.',
        modernMapping:
          'Zhen is a shock, a sudden event that shakes everything: bad news, crisis, abrupt change.\n\nThe hexagram does not say to dodge it — it teaches how to respond: fear and trembling at first is natural, but keeping calm ("not dropping the wine spoon") brings "laughter and words" afterward. Deeper still: use the shock as an occasion to "set yourself in order and examine yourself" — an upheaval is a wake-up bell.',
      },
    },
  },
  52: {
    modernShort:
      'Núi chồng núi đứng yên — dừng đúng lúc, an trú trong hiện tại, tĩnh tâm để sáng.',
    keywords: ['tĩnh tại', 'dừng', 'an trú'],
    judgmentClassic:
      'Dừng ở lưng (chỗ không sinh ham muốn), không thấy được thân mình; đi trong sân mà chẳng thấy người, không lỗi (艮其背，不獲其身，行其庭，不見其人，无咎).',
    imageClassic:
      'Hai núi chồng nhau, là Cấn; người quân tử nhân đó suy nghĩ không vượt ra ngoài cương vị của mình (兼山，艮；君子以思不出其位).',
    modernDeep: {
      structureInsight:
        'Núi (Cấn) chồng lên núi (Cấn): tĩnh chồng tĩnh, dừng lại tuyệt đối. Hào dương ở đỉnh mỗi quẻ đơn như cái nắp chặn lại — "cấn" là dừng, tĩnh tại.',
      transformInsight:
        'Đối là Thuần Đoài (#58): dừng tĩnh (Cấn) so với vui hòa (Đoài). Đảo là Thuần Chấn (#51, động). Hỗ là Giải (#40).',
      binaryInsight:
        'Giá trị 36, ô (hàng 4 = Cấn, cột 4 = Cấn). Một trong tám quẻ thuần.',
      linePositions:
        'Hào 2 đắc trung; không cặp hào nào ứng nhau (hai quẻ đơn giống hệt) — sự tĩnh hướng nội, không tìm cầu bên ngoài. "Dừng ở lưng": dừng đúng chỗ không sinh ham muốn.',
      modernMapping:
        'Cấn là biết dừng đúng lúc, an trú trong hiện tại, tĩnh tâm. Giữa thời quá tải kích thích, đây là kỹ năng quý: ngừng đuổi theo, lặng lại để sáng.\n\n"Suy nghĩ không ra ngoài cương vị": dừng nghĩa là tập trung vào chỗ của mình, không phóng tâm tán loạn. Tĩnh không phải bất động — mà là dừng đúng nơi cần dừng.',
    },
    en: {
      modernShort:
        'Mountain upon mountain, standing still — stopping at the right time, dwelling in the present, calming the mind to see clearly.',
      keywords: ['stillness', 'stopping', 'presence'],
      judgmentGloss:
        'Keeping the back still (where no desire arises), one does not perceive one’s own body; walking in one’s courtyard, one does not see the people; no blame (艮其背，不獲其身，行其庭，不見其人，无咎).',
      imageGloss:
        'Two mountains, one upon the other, make Keeping Still; the noble person accordingly does not let their thoughts go beyond their position (兼山，艮；君子以思不出其位).',
      modernDeep: {
        structureInsight:
          'Mountain (Gen) upon mountain (Gen): stillness upon stillness, absolute stopping. The yang line at the top of each trigram is like a lid holding it down — "Gen" is stopping, stillness.',
        transformInsight:
          'Its opposite is the Joyous (#58): stopping and stillness (Gen) versus joyous harmony (Dui). Its reversed is the Arousing (#51, motion). Its nuclear is Deliverance (#40).',
        binaryInsight:
          'Value 36, cell (row 4 = Gen, col 4 = Gen). One of the eight doubled hexagrams.',
        linePositions:
          'Line 2 is central; no pair resonates (the two trigrams are identical) — the stillness is inward-turned, seeking nothing outside. "Keeping the back still": stopping at the place where no desire arises.',
        modernMapping:
          'Gen is knowing to stop at the right time, dwelling in the present, calming the mind. In an age of overstimulation this is a precious skill: stop chasing, grow quiet, and see clearly.\n\n"Thoughts not going beyond your position": to stop is to focus on your own place, not to let the mind scatter. Stillness is not immobility — it is stopping exactly where you should stop.',
      },
    },
  },
  53: {
    modernShort:
      'Tiến từ từ như cây mọc — phát triển đúng trình tự, vững chãi và kiên nhẫn thì bền.',
    keywords: ['tiến dần', 'tuần tự', 'vững'],
    judgmentClassic:
      'Người con gái về nhà chồng thì tốt, lợi về giữ chính (漸：女歸吉，利貞).',
    imageClassic:
      'Trên núi có cây (cây lớn dần trên núi), là Tiệm; người quân tử nhân đó vun đắp đức hiền, làm tốt phong tục (山上有木，漸；君子以居賢德善俗).',
    modernDeep: {
      structureInsight:
        'Gió/cây (Tốn) ở trên, núi (Cấn) ở dưới: cây mọc trên núi, lớn lên từ từ theo năm tháng — "tiệm" là tiến dần, tuần tự.',
      transformInsight:
        'Quẻ đối và quẻ đảo đều là Quy Muội (#54): tiến đúng trình tự (Tiệm) so với vào cuộc vội/sai thứ tự (Quy Muội) — cặp gương về cách "về". Hỗ là Vị Tế (#64).',
      binaryInsight:
        'Giá trị 52, ô (hàng 6 = Tốn, cột 4 = Cấn).',
      linePositions:
        'Hào 2 và hào 5 đều trung chính: trục vững cho sự tiến từng bước. Tiến dần mà đúng vị mỗi chặng, như cô dâu về nhà chồng theo đủ lễ — nên "tốt".',
      modernMapping:
        'Tiệm là phát triển đúng trình tự: từng bước vững chắc, không đốt cháy giai đoạn. Cây trên núi không lớn sau một đêm.\n\nMọi sự trưởng thành bền (sự nghiệp, quan hệ, kỹ năng) đều theo nhịp này. Nóng vội nhảy cóc thì gãy; kiên nhẫn đi đủ các bước, mỗi bước đứng đúng chỗ, thì tới nơi.',
    },
    en: {
      modernShort:
        'Advancing gradually like a growing tree — developing in proper sequence, steady and patient, and it endures.',
      keywords: ['gradual progress', 'sequence', 'steadiness'],
      judgmentGloss:
        'The maiden goes to her husband’s house; good fortune, furthering through perseverance (漸：女歸吉，利貞).',
      imageGloss:
        'On the mountain there is a tree (growing tall by degrees): Development; the noble person accordingly abides in worthy virtue and improves the customs (山上有木，漸；君子以居賢德善俗).',
      modernDeep: {
        structureInsight:
          'Wind/wood (Xun) above, mountain (Gen) below: a tree growing on the mountain, rising slowly over the years — "Jian" is gradual, sequential advance.',
        transformInsight:
          'Its opposite and its reversed are both The Marrying Maiden (#54): advancing in due order (Jian) versus entering hastily or out of order (Gui Mei) — a mirror pair on how one "goes." Its nuclear is Before Completion (#64).',
        binaryInsight:
          'Value 52, cell (row 6 = Xun, col 4 = Gen).',
        linePositions:
          'Lines 2 and 5 are both central and correct: a firm axis for step-by-step advance. Advancing by degrees, rightly placed at each stage, like a bride going to her husband’s house with full rites — hence "good fortune."',
        modernMapping:
          'Jian is developing in proper sequence: firm step by firm step, skipping no stage. A tree on a mountain does not grow overnight.\n\nAll durable growth (a career, a relationship, a skill) follows this rhythm. Impatient leaps snap; patient completion of every step, each rightly placed, arrives.',
      },
    },
  },
  54: {
    modernShort:
      'Vào cuộc ở thế phụ — hiểu giới hạn vai trò, giữ đúng mực để không sinh hối tiếc.',
    keywords: ['lệ thuộc', 'biết phận', 'đúng mực'],
    judgmentClassic:
      'Tiến tới thì xấu, không có gì lợi (歸妹：征凶，无攸利).',
    imageClassic:
      'Trên đầm có sấm (sấm động làm đầm dao động), là Quy Muội; người quân tử nhân đó nghĩ tới sự bền đến cùng mà biết trước chỗ hỏng (澤上有雷，歸妹；君子以永終知敝).',
    modernDeep: {
      structureInsight:
        'Sấm (Chấn) ở trên, đầm (Đoài, thiếu nữ) ở dưới: thiếu nữ động lòng theo người, nhưng vào ở thế phụ, không phải chính thất — "quy muội" là cô em gái về làm lẽ.',
      transformInsight:
        'Quẻ đối và quẻ đảo đều là Tiệm (#53): vào cuộc đúng trình tự (Tiệm) so với vào ở thế lệ thuộc/vội (Quy Muội). Hỗ là Ký Tế (#63).',
      binaryInsight:
        'Giá trị 11, ô (hàng 1 = Chấn, cột 3 = Đoài).',
      linePositions:
        'Hào 2 ứng hào 5 nhưng nhiều hào lệch vị, không hào nào vừa trung vừa chính theo lối đẹp — tượng vị thế không chính đính. "Tiến thì xấu": ở thế phụ mà đòi tiến như chính thì hỏng.',
      modernMapping:
        'Quy Muội là vào cuộc ở thế phụ, không phải vai chính: làm lẽ, cộng sự cấp dưới, đối tác yếu thế.\n\nKhôn ngoan là hiểu đúng giới hạn vai trò mình: giữ đúng mực, làm tốt phần được giao, đừng đòi quyền của vai chính ("tiến thì xấu"). Và "biết trước chỗ hỏng" — lường trước rủi ro của quan hệ lệch thế để giữ cho bền.',
    },
    en: {
      modernShort:
        'Entering in a subordinate role — understand the limits of your position, keep due measure to avoid regret.',
      keywords: ['dependence', 'knowing one’s place', 'measure'],
      judgmentGloss:
        'To advance brings misfortune; nothing that furthers (征凶，无攸利).',
      imageGloss:
        'Above the lake there is thunder (the lake ripples): The Marrying Maiden; the noble person accordingly thinks of the lasting end and knows the flaws in advance (澤上有雷，歸妹；君子以永終知敝).',
      modernDeep: {
        structureInsight:
          'Thunder (Zhen) above, lake (Dui, youngest daughter) below: the young woman, moved by feeling, follows a man, but enters in a subordinate place, not as the principal wife — "Gui Mei" is the younger sister who comes as a secondary spouse.',
        transformInsight:
          'Its opposite and its reversed are both Development (#53): entering in due order (Jian) versus entering in a dependent or hasty way (Gui Mei). Its nuclear is After Completion (#63).',
        binaryInsight:
          'Value 11, cell (row 1 = Zhen, col 3 = Dui).',
        linePositions:
          'Line 2 resonates with line 5, but many lines are out of place and none is "beautifully" central-and-correct — the image of an unrightful position. "To advance brings misfortune": in a subordinate place, to press for the principal’s rights spoils things.',
        modernMapping:
          'Gui Mei is entering in a subordinate role, not the lead: a secondary spouse, a junior partner, the weaker party.\n\nWisdom is to grasp the true limits of your role: keep due measure, do well the part assigned, do not claim the lead’s authority ("to advance brings misfortune"). And "know the flaws in advance" — foresee the risks of an unequal relationship to keep it durable.',
      },
    },
  },
  55: {
    modernShort:
      'Đỉnh cao rực rỡ như mặt trời đứng bóng — tận hưởng thịnh vượng nhưng nhớ bóng xế kề bên.',
    keywords: ['sung mãn', 'cực thịnh', 'tỉnh táo'],
    judgmentClassic:
      'Hanh thông; bậc vua đạt tới sự sung mãn, chớ lo, nên như mặt trời đứng bóng (豐：亨，王假之，勿憂，宜日中).',
    imageClassic:
      'Sấm chớp cùng đến (uy và sáng cực thịnh), là Phong; người quân tử nhân đó xử kiện và thi hành hình phạt (雷電皆至，豐；君子以折獄致刑).',
    modernDeep: {
      structureInsight:
        'Sấm (Chấn) ở trên, lửa/chớp (Ly) ở dưới: sấm chớp cùng phát, uy lẫn sáng đều cực thịnh — "phong" là sung mãn, dồi dào tới đỉnh.',
      transformInsight:
        'Đảo thành Lữ (#56): cực thịnh tại chỗ (Phong) và kẻ lữ thứ tha hương (Lữ) là cặp gương — đầy rồi sẽ vơi, ở rồi sẽ đi. Đối là Hoán (#59), hỗ là Đại Quá (#28).',
      binaryInsight:
        'Giá trị 13, ô (hàng 1 = Chấn, cột 5 = Ly).',
      linePositions:
        'Hào 2 (âm, đắc trung) sáng giữa quẻ; nhưng cả quẻ nhấn cái "đầy tới đỉnh". "Nên như mặt trời đứng bóng": đỉnh cao cũng là khắc mặt trời bắt đầu xế — đầy thì khó giữ.',
      modernMapping:
        'Phong là đỉnh cao rực rỡ: thành tựu, thịnh vượng tới mức sung mãn nhất — như mặt trời chính ngọ.\n\nNiềm vui kèm lời nhắc tỉnh táo: "mặt trời đứng bóng" rồi sẽ xế. Tận hưởng và phát huy lúc đỉnh, nhưng đừng quên bóng tối kề bên — đầy thì gần vơi, đỉnh thì gần dốc. Giữ sáng suốt giữa hào quang.',
    },
    en: {
      modernShort:
        'A brilliant peak like the sun at noon — enjoy the abundance, but remember the shadow beside it.',
      keywords: ['abundance', 'fullness', 'clear-sightedness'],
      judgmentGloss:
        'Pervading; the king attains it, do not worry, be like the sun at noon (亨，王假之，勿憂，宜日中).',
      imageGloss:
        'Thunder and lightning both arrive (authority and brightness at their peak): Abundance; the noble person accordingly decides lawsuits and executes punishments (雷電皆至，豐；君子以折獄致刑).',
      modernDeep: {
        structureInsight:
          'Thunder (Zhen) above, fire/lightning (Li) below: thunder and lightning together, authority and brightness both at their height — "Feng" is fullness, abundance at its peak.',
        transformInsight:
          'Reversed, it becomes The Wanderer (#56): peak abundance at home (Feng) and the wanderer far from home (Lü) are a mirror pair — full then empties, settled then departs. Its opposite is Dispersion (#59); its nuclear is Preponderance of the Great (#28).',
        binaryInsight:
          'Value 13, cell (row 1 = Zhen, col 5 = Li).',
        linePositions:
          'Line 2 (yin, central) is the brightness within; but the whole hexagram stresses fullness at its peak. "Be like the sun at noon": the summit is also the moment the sun begins to decline — the full is hard to hold.',
        modernMapping:
          'Feng is a brilliant peak: achievement and prosperity at their fullest — like the sun at high noon.\n\nThe joy comes with a sobering reminder: "the sun at noon" will decline. Enjoy and make the most of the peak, but do not forget the shadow beside it — the full is near to emptying, the summit near the slope. Keep clear-sighted amid the glory.',
      },
    },
  },
  56: {
    modernShort:
      'Kẻ đi xa, tạm bợ nơi đất khách — khiêm nhường, thận trọng và tử tế để được nương nhờ.',
    keywords: ['lữ khách', 'tạm bợ', 'thận trọng'],
    judgmentClassic:
      'Hơi hanh thông; kẻ lữ hành giữ chính thì tốt (旅：小亨，旅貞吉).',
    imageClassic:
      'Trên núi có lửa (lửa cháy lan không ở yên), là Lữ; người quân tử nhân đó sáng suốt thận trọng khi dùng hình, không giam giữ kéo dài (山上有火，旅；君子以明慎用刑，而不留獄).',
    modernDeep: {
      structureInsight:
        'Lửa (Ly) ở trên, núi (Cấn) ở dưới: lửa cháy trên núi, lan rồi tắt, không ở yên một chỗ — tượng kẻ lữ thứ, ở tạm nơi đất khách.',
      transformInsight:
        'Đảo của Phong (#55): cực thịnh ở nhà (Phong) so với bơ vơ tha hương (Lữ). Đối là Tiết (#60), hỗ là Đại Quá (#28).',
      binaryInsight:
        'Giá trị 44, ô (hàng 5 = Ly, cột 4 = Cấn).',
      linePositions:
        'Hào 2 (âm, đắc trung) là kẻ lữ biết khiêm nên được chỗ trú. Không hào nào vừa trung vừa chính trọn vẹn — phận lữ khách vốn chông chênh, càng cần đúng mực để yên thân.',
      modernMapping:
        'Lữ là cảnh sống tạm nơi đất khách: đi xa, ở môi trường lạ, vị thế chưa có gốc rễ.\n\nỞ thế ấy, "hanh" chỉ ở mức nhỏ, và bí quyết là khiêm nhường, thận trọng, tử tế để được người nương nhờ. Khoe khoang hay ngang ngạnh nơi đất lạ là rước họa; hành xử đúng mực thì kẻ lữ vẫn được an.',
    },
    en: {
      modernShort:
        'The traveler, lodging in a strange land — be humble, careful, and kind to find shelter.',
      keywords: ['traveler', 'transience', 'caution'],
      judgmentGloss:
        'A little pervading; for the wanderer, perseverance brings good fortune (小亨，旅貞吉).',
      imageGloss:
        'On the mountain there is fire (spreading, never resting): The Wanderer; the noble person accordingly is clear and careful in applying punishments and does not prolong imprisonment (山上有火，旅；君子以明慎用刑，而不留獄).',
      modernDeep: {
        structureInsight:
          'Fire (Li) above, mountain (Gen) below: fire burning on the mountain, spreading then dying, never resting in one place — the image of a traveler lodging temporarily in a strange land.',
        transformInsight:
          'The reversed of Abundance (#55): peak abundance at home (Feng) versus being adrift far away (Lü). Its opposite is Limitation (#60); its nuclear is Preponderance of the Great (#28).',
        binaryInsight:
          'Value 44, cell (row 5 = Li, col 4 = Gen).',
        linePositions:
          'Line 2 (yin, central) is the wanderer who, being humble, finds lodging. No line is fully central-and-correct — the wanderer’s lot is precarious, all the more needing due measure to be secure.',
        modernMapping:
          'Lü is living as a stranger far from home: away, in an unfamiliar setting, without established roots.\n\nIn that position, "pervasion" is only slight, and the secret is humility, caution, and kindness so that others take you in. To boast or be defiant in a strange land invites disaster; conduct with due measure, and even a wanderer stays safe.',
      },
    },
  },
  57: {
    modernShort:
      'Gió nối gió thấm khắp — ảnh hưởng nhẹ mà bền; kiên trì lặp lại để thấm sâu.',
    keywords: ['thẩm thấu', 'mềm dẻo', 'bền bỉ'],
    judgmentClassic:
      'Hơi hanh thông; lợi về chỗ có đi, lợi gặp người lớn (巽：小亨，利有攸往，利見大人).',
    imageClassic:
      'Gió tiếp gió (gió theo nhau), là Tốn; người quân tử nhân đó ban lại mệnh lệnh rồi mới làm việc (隨風，巽；君子以申命行事).',
    modernDeep: {
      structureInsight:
        'Gió (Tốn) chồng lên gió (Tốn): gió nối gió, len lỏi thấm vào mọi kẽ. Mỗi quẻ đơn có hào âm nép dưới hai hào dương — tượng sự thuận nhập, mềm mà thấm sâu.',
      transformInsight:
        'Đối là Thuần Chấn (#51): thẩm thấu nhẹ (Tốn) so với chấn động mạnh (Chấn). Đảo là Thuần Đoài (#58). Hỗ là Khuê (#38).',
      binaryInsight:
        'Giá trị 54, ô (hàng 6 = Tốn, cột 6 = Tốn). Một trong tám quẻ thuần.',
      linePositions:
        'Hào 5 (dương, trung chính) dẫn dắt; hào âm ở đáy mỗi quẻ đơn là sự khiêm thuận đi vào. "Ban mệnh rồi mới làm": ảnh hưởng kiểu Tốn là thấm dần, lặp lại, không cưỡng ép.',
      modernMapping:
        'Tốn là ảnh hưởng mềm mà bền: như gió, không phá cửa mà len qua khe — thuyết phục, thẩm thấu, kiên trì lặp lại.\n\nSức của nó là "nhỏ mà thấm": một thông điệp nhắc đi nhắc lại nhẹ nhàng đổi được cả nếp nghĩ. Nhưng "hơi hanh" thôi — mềm dẻo hợp việc nhỏ và dài hơi, cần kèm người dẫn dắt vững ("gặp người lớn") cho có hướng.',
    },
    en: {
      modernShort:
        'Wind after wind, penetrating all — soft yet lasting influence; persist and repeat to sink in deep.',
      keywords: ['penetrating', 'flexible', 'persistence'],
      judgmentGloss:
        'A little pervading; furthering to have somewhere to go, furthering to see the great person (小亨，利有攸往，利見大人).',
      imageGloss:
        'Wind following wind makes the Gentle; the noble person accordingly repeats their commands and carries out their affairs (隨風，巽；君子以申命行事).',
      modernDeep: {
        structureInsight:
          'Wind (Xun) upon wind (Xun): wind following wind, threading into every crevice. Each trigram has a yin line yielding beneath two yang — the image of compliant entering, soft yet soaking in deep.',
        transformInsight:
          'Its opposite is the Arousing (#51): gentle penetration (Xun) versus strong shock (Zhen). Its reversed is the Joyous (#58). Its nuclear is Opposition (#38).',
        binaryInsight:
          'Value 54, cell (row 6 = Xun, col 6 = Xun). One of the eight doubled hexagrams.',
        linePositions:
          'Line 5 (yang, central and correct) leads; the yin line at the base of each trigram is the humble entering. "Repeat the command, then act": Xun-style influence sinks in gradually, by repetition, without force.',
        modernMapping:
          'Xun is soft yet lasting influence: like wind, it does not break down the door but slips through the crack — persuading, permeating, patiently repeating.\n\nIts power is "small yet soaking in": a message gently repeated can shift a whole habit of mind. But only "a little pervading" — softness suits small, long-haul matters, and needs a firm guide ("see the great person") for direction.',
      },
    },
  },
  58: {
    modernShort:
      'Đầm nối đầm, niềm vui chân thành — chia sẻ và khích lệ nhau, vui đúng cách thì sức bền.',
    keywords: ['niềm vui', 'chia sẻ', 'cởi mở'],
    judgmentClassic:
      'Hanh thông, lợi về giữ chính (兌：亨，利貞).',
    imageClassic:
      'Hai đầm liền nhau (thấm tưới cho nhau), là Đoài; người quân tử nhân đó cùng bạn bè giảng giải, học tập (麗澤，兌；君子以朋友講習).',
    modernDeep: {
      structureInsight:
        'Đầm (Đoài) chồng lên đầm (Đoài): hai đầm kề nhau thấm tưới cho nhau. Hào âm vui ở đỉnh mỗi quẻ đơn — tượng niềm vui, sự cởi mở chia sẻ.',
      transformInsight:
        'Đối là Thuần Cấn (#52): vui hòa cởi mở (Đoài) so với dừng tĩnh hướng nội (Cấn). Đảo là Thuần Tốn (#57). Hỗ là Gia Nhân (#37).',
      binaryInsight:
        'Giá trị 27, ô (hàng 3 = Đoài, cột 3 = Đoài). Một trong tám quẻ thuần.',
      linePositions:
        'Hào 5 (dương, trung chính) là niềm vui có gốc vững, không phải vui hời hợt; hào âm ở đỉnh là vẻ cởi mở bên ngoài. Vui mà chính đính thì "lợi trinh".',
      modernMapping:
        'Đoài là niềm vui chân thành, sự cởi mở và khích lệ lẫn nhau: như hai đầm tưới cho nhau, người với người làm nhau phong phú lên.\n\nHình ảnh rất hay: "cùng bạn giảng giải học tập" — niềm vui sâu nhất đến từ trao đổi, cùng tiến. Nhưng "lợi trinh": vui phải đúng cách, đúng điều; vui buông tuồng thì hại.',
    },
    en: {
      modernShort:
        'Lake joining lake, sincere joy — sharing and encouraging one another, joy done rightly gives lasting strength.',
      keywords: ['joy', 'sharing', 'openness'],
      judgmentGloss:
        'Pervading, furthering through perseverance (亨，利貞).',
      imageGloss:
        'Two adjoining lakes (watering each other) make the Joyous; the noble person accordingly joins with friends to discuss and study (麗澤，兌；君子以朋友講習).',
      modernDeep: {
        structureInsight:
          'Lake (Dui) upon lake (Dui): two lakes side by side, watering each other. The yin line rejoicing at the top of each trigram — the image of joy, openness, and sharing.',
        transformInsight:
          'Its opposite is Keeping Still (#52): joyous openness (Dui) versus inward stillness (Gen). Its reversed is the Gentle (#57). Its nuclear is The Family (#37).',
        binaryInsight:
          'Value 27, cell (row 3 = Dui, col 3 = Dui). One of the eight doubled hexagrams.',
        linePositions:
          'Line 5 (yang, central and correct) is joy with a firm root, not shallow pleasure; the yin line at the top is the outward openness. Joy that is upright "furthers through perseverance."',
        modernMapping:
          'Dui is sincere joy, openness, and mutual encouragement: like two lakes watering each other, people enriching one another.\n\nA lovely image: "friends discussing and studying together" — the deepest joy comes from exchange, from advancing together. But "furthering through perseverance": joy must be rightly directed; joy let loose harms.',
      },
    },
  },
  59: {
    modernShort:
      'Băng tan gió thổi tản — gỡ bỏ ngăn cách và cứng nhắc, khơi thông để gắn lại quanh điều chung.',
    keywords: ['phân tán', 'khơi thông', 'gắn kết lại'],
    judgmentClassic:
      'Hanh thông; vua đến nhà tông miếu, lợi vượt sông lớn, lợi về giữ chính (渙：亨。王假有廟，利涉大川，利貞).',
    imageClassic:
      'Gió đi trên mặt nước (làm nước tản ra), là Hoán; các tiên vương nhân đó tế Thượng Đế, lập tông miếu (風行水上，渙；先王以享于帝立廟).',
    modernDeep: {
      structureInsight:
        'Gió (Tốn) ở trên, nước (Khảm) ở dưới: gió thổi trên mặt nước làm nó loang tản ra — "hoán" là phân tán, làm tan sự đông cứng/ngăn cách.',
      transformInsight:
        'Đảo thành Tiết (#60): tản ra (Hoán) và tiết chế gom lại (Tiết) là cặp gương — tan và giữ. Đối là Phong (#55), hỗ là Di (#27).',
      binaryInsight:
        'Giá trị 50, ô (hàng 6 = Tốn, cột 2 = Khảm).',
      linePositions:
        'Hào 5 (dương, đắc trung) ở vị tôn là tâm điểm để quy tụ lại sau khi tan. "Vua đến tông miếu": giữa lúc phân tán, cần một điểm tựa tinh thần chung để gắn người lại.',
      modernMapping:
        'Hoán là làm tan sự đông cứng: gỡ bỏ ngăn cách, cởi nút tắc nghẽn, phá thế cô lập hay trì trệ.\n\nNhưng tan không phải để rã đám — mà để tái tổ chức quanh điều chung. Như nước tản rồi gió lại gom; phá cái cũ cứng nhắc xong phải có một "tông miếu" (giá trị/mục tiêu chung) để mọi người tụ lại.',
    },
    en: {
      modernShort:
        'Ice thawing, wind scattering — dissolve barriers and rigidity, open things up to regather around a common cause.',
      keywords: ['dispersion', 'opening up', 'regathering'],
      judgmentGloss:
        'Pervading; the king approaches his ancestral temple, furthering to cross the great water, furthering through perseverance (亨。王假有廟，利涉大川，利貞).',
      imageGloss:
        'Wind moves over the water (scattering it): Dispersion; the ancient kings accordingly made offerings to the Supreme and founded ancestral temples (風行水上，渙；先王以享于帝立廟).',
      modernDeep: {
        structureInsight:
          'Wind (Xun) above, water (Kan) below: wind blowing over the water spreads it out — "Huan" is dispersion, dissolving what is frozen hard or blocking.',
        transformInsight:
          'Reversed, it becomes Limitation (#60): scattering (Huan) and reining in (Jie) are a mirror pair — dissolving and holding. Its opposite is Abundance (#55); its nuclear is Nourishment (#27).',
        binaryInsight:
          'Value 50, cell (row 6 = Xun, col 2 = Kan).',
        linePositions:
          'Line 5 (yang, central) in the honored place is the focal point to regather around after scattering. "The king approaches the temple": amid dispersion, a shared spiritual anchor is needed to bind people again.',
        modernMapping:
          'Huan is dissolving what has frozen hard: removing barriers, untying blockages, breaking isolation or stagnation.\n\nBut to scatter is not to disband — it is to reorganize around a common cause. As water disperses and then wind regathers it; break the old rigidity, then have a "temple" (a shared value or aim) for all to gather around again.',
      },
    },
  },
  60: {
    modernShort:
      'Đặt giới hạn hợp lý — như nước trong đầm có bờ; điều độ giúp bền, nhưng chớ hà khắc quá.',
    keywords: ['tiết chế', 'giới hạn', 'điều độ'],
    judgmentClassic:
      'Hanh thông; nhưng tiết chế đến mức khắc khổ thì không thể giữ lâu (節：亨。苦節不可貞).',
    imageClassic:
      'Trên đầm có nước (đầm chứa nước có hạn), là Tiết; người quân tử nhân đó đặt ra chế độ, mức độ, bàn định đức hạnh (澤上有水，節；君子以制數度，議德行).',
    modernDeep: {
      structureInsight:
        'Nước (Khảm) ở trên, đầm (Đoài) ở dưới: đầm chứa nước nhưng chỉ tới một mức — đầy quá thì tràn. "Tiết" là tiết chế, đặt giới hạn hợp lý.',
      transformInsight:
        'Đảo của Hoán (#59): tản ra (Hoán) và gom giữ trong giới hạn (Tiết). Đối là Lữ (#56), hỗ là Di (#27).',
      binaryInsight:
        'Giá trị 19, ô (hàng 2 = Khảm, cột 3 = Đoài).',
      linePositions:
        'Hào 5 (dương, trung chính) là mức tiết chế đúng đắn — chuẩn mực ở vị tôn. "Tiết khổ không giữ được": giới hạn phải vừa phải; hà khắc quá thì phản tác dụng, không bền.',
      modernMapping:
        'Tiết là đặt giới hạn hợp lý: như đầm có bờ, ngân sách có hạn mức, thời gian có kỷ luật. Điều độ giúp mọi thứ bền.\n\nNhưng quẻ cảnh báo ngay: "tiết chế khắc khổ thì không giữ được". Kỷ luật quá hà khắc sẽ gãy. Giới hạn tốt là giới hạn vừa sức, duy trì được lâu — không phải càng nghiệt càng hay.',
    },
    en: {
      modernShort:
        'Setting sensible limits — like water in a lake with banks; moderation makes things endure, but do not be harsh.',
      keywords: ['moderation', 'limits', 'measure'],
      judgmentGloss:
        'Pervading; but limitation carried to bitter harshness cannot be maintained (亨。苦節不可貞).',
      imageGloss:
        'Above the lake there is water (holding a limited amount): Limitation; the noble person accordingly sets up measures and standards, and deliberates on virtuous conduct (澤上有水，節；君子以制數度，議德行).',
      modernDeep: {
        structureInsight:
          'Water (Kan) above, lake (Dui) below: the lake holds water but only to a level — too full and it overflows. "Jie" is limitation, setting sensible bounds.',
        transformInsight:
          'The reversed of Dispersion (#59): scattering (Huan) versus holding within bounds (Jie). Its opposite is The Wanderer (#56); its nuclear is Nourishment (#27).',
        binaryInsight:
          'Value 19, cell (row 2 = Kan, col 3 = Dui).',
        linePositions:
          'Line 5 (yang, central and correct) is the right measure of limitation — the standard in the honored place. "Bitter limitation cannot be maintained": limits must be moderate; too harsh, they backfire and cannot last.',
        modernMapping:
          'Jie is setting sensible limits: like a lake with banks, a budget with a cap, time with discipline. Moderation makes everything durable.\n\nBut the hexagram warns at once: "harsh, bitter limitation cannot be maintained." Discipline too severe snaps. A good limit is one within reach, sustainable over time — not the harsher the better.',
      },
    },
  },
  61: {
    modernShort:
      'Lòng thành thấu suốt — chân thật từ bên trong cảm hoá được cả người ở xa; niềm tin là gốc.',
    keywords: ['thành tín', 'chân thật', 'cảm hoá'],
    judgmentClassic:
      'Lòng thành thấu đến cả heo cá (loài vô tri) thì tốt; lợi vượt sông lớn, lợi về giữ chính (中孚：豚魚吉，利涉大川，利貞).',
    imageClassic:
      'Trên đầm có gió (gió chạm thấu cả mặt nước sâu), là Trung Phu; người quân tử nhân đó bàn xét án ngục, hoãn án tử (澤上有風，中孚；君子以議獄緩死).',
    modernDeep: {
      structureInsight:
        'Gió (Tốn) ở trên, đầm (Đoài) ở dưới: gió chạm thấu mặt đầm. Hai hào âm rỗng nằm giữa (hào 3, 4) như cái lòng trống thành thật — "trung phu" là lòng thành ở bên trong.',
      transformInsight:
        'Đối là Tiểu Quá (#62): thành tín bên trong (Trung Phu) so với vượt mức nhỏ bên ngoài (Tiểu Quá). Trung Phu là quẻ tự-đảo. Hỗ là Di (#27).',
      binaryInsight:
        'Giá trị 51, ô (hàng 6 = Tốn, cột 3 = Đoài). Hình quẻ rỗng ruột (hai hào giữa âm) — tượng cái tâm trống mà thành.',
      linePositions:
        'Hào 2 và hào 5 (đều dương, đắc trung) là lòng thành vững vàng; hai hào âm giữa là sự khiêm hư đón nhận. Cặp 1–4 và 3–6 ứng nhau — thành tín lan ra cả trên dưới.',
      modernMapping:
        'Trung Phu là lòng thành tự bên trong: chân thật tới mức cảm hóa được cả người ở xa, cả loài vô tri ("heo cá"). Niềm tin là gốc của mọi quan hệ bền.\n\nĐiểm tinh tế nằm ở chữ "trung" (giữa) rỗng: thành thật thật sự đi với cái tâm trống — không định kiến, không giả tạo. Đó là vì sao nó "vượt được sông lớn": tin nhau thì làm được việc khó.',
    },
    en: {
      modernShort:
        'Sincerity that penetrates — truth from within wins over even those far off; trust is the root.',
      keywords: ['sincerity', 'truthfulness', 'moving others'],
      judgmentGloss:
        'Sincerity reaching even pigs and fishes (dumb creatures) is good; furthering to cross the great water, furthering through perseverance (豚魚吉，利涉大川，利貞).',
      imageGloss:
        'Above the lake there is wind (touching the very depths of the water): Inner Truth; the noble person accordingly deliberates over lawsuits and delays executions (澤上有風，中孚；君子以議獄緩死).',
      modernDeep: {
        structureInsight:
          'Wind (Xun) above, lake (Dui) below: wind reaching down to the surface of the lake. Two hollow yin lines in the middle (lines 3, 4), like an empty, sincere heart — "Zhong Fu" is truth held within.',
        transformInsight:
          'Its opposite is Preponderance of the Small (#62): inner truth (Zhong Fu) versus slight outward excess (Xiao Guo). Zhong Fu is a self-inverting hexagram. Its nuclear is Nourishment (#27).',
        binaryInsight:
          'Value 51, cell (row 6 = Xun, col 3 = Dui). The figure is hollow at the center (the two middle lines yin) — the image of a heart empty yet sincere.',
        linePositions:
          'Lines 2 and 5 (both yang, central) are steadfast sincerity; the two yin lines between are humble, open receptivity. The pairs 1–4 and 3–6 resonate — sincerity spreading through both above and below.',
        modernMapping:
          'Zhong Fu is sincerity from within: so genuine it moves even those far off, even dumb creatures ("pigs and fishes"). Trust is the root of every lasting bond.\n\nThe subtlety is in the hollow "center": real sincerity goes with an empty heart — no prejudice, no pretense. That is why it "can cross the great water": where there is mutual trust, the hardest things become possible.',
      },
    },
  },
  62: {
    modernShort:
      'Làm hơi quá ở việc nhỏ thì được — khiêm tốn, cẩn trọng tiểu tiết; chớ với cao quá tầm.',
    keywords: ['vượt mức nhỏ', 'cẩn trọng', 'khiêm'],
    judgmentClassic:
      'Hanh thông, lợi về giữ chính; làm được việc nhỏ, không làm được việc lớn. Chim bay để lại tiếng kêu: không nên bay lên cao mà nên đậu xuống thấp, thì rất tốt (小過：亨，利貞，可小事，不可大事。飛鳥遺之音，不宜上宜下，大吉).',
    imageClassic:
      'Trên núi có sấm (tiếng sấm hơi quá chỗ thường), là Tiểu Quá; người quân tử nhân đó cư xử hơi quá ở sự cung kính, để tang hơi quá ở sự thương, tiêu dùng hơi quá ở sự tiết kiệm (山上有雷，小過；君子以行過乎恭，喪過乎哀，用過乎儉).',
    modernDeep: {
      structureInsight:
        'Sấm (Chấn) ở trên, núi (Cấn) ở dưới: sấm trên núi vang hơi quá mức thường. Bốn hào âm ngoài, hai dương kẹt giữa — âm hơi trội, hợp việc nhỏ. "Tiểu quá" là vượt mức một chút ở việc nhỏ.',
      transformInsight:
        'Đối là Trung Phu (#61): vượt mức nhỏ bên ngoài (Tiểu Quá) so với thành tín bên trong (Trung Phu). Tiểu Quá là quẻ tự-đảo. Hỗ là Đại Quá (#28) — "quá lớn" soi với "quá nhỏ".',
      binaryInsight:
        'Giá trị 12, ô (hàng 1 = Chấn, cột 4 = Cấn).',
      linePositions:
        'Hào 2 (âm, trung chính) hợp với cảnh "nên xuống thấp". Hai hào dương kẹt giữa, bốn âm ngoài — sức nhỏ trội, nên "việc nhỏ thì được, việc lớn thì không". "Chim nên đậu xuống": khiêm hạ thì lành.',
      modernMapping:
        'Tiểu Quá: thời nên làm hơi quá một chút ở những việc nhỏ — cẩn trọng hơn mức thường, khiêm hơn, tiết kiệm hơn — nhưng KHÔNG với cao làm việc lớn.\n\nHình ảnh con chim: "nên đậu xuống thấp, đừng bay lên cao". Lúc này nhún mình và chăm chút tiểu tiết thì an; ôm mộng lớn, phô trương vượt tầm thì gặp họa. Quá một chút theo hướng khiêm là tốt.',
    },
    en: {
      modernShort:
        'Going a little too far in small things is fine — be humble and careful with details; do not reach too high.',
      keywords: ['slight excess', 'caution', 'humility'],
      judgmentGloss:
        'Pervading, furthering through perseverance; one may do small things, not great things. The flying bird leaves its call: it should not fly up but settle down, which is very auspicious (可小事，不可大事…不宜上宜下，大吉).',
      imageGloss:
        'On the mountain there is thunder (a peal slightly beyond the usual): Preponderance of the Small; the noble person accordingly is a little over-respectful, a little over-sorrowful in mourning, a little over-frugal (山上有雷，小過…用過乎儉).',
      modernDeep: {
        structureInsight:
          'Thunder (Zhen) above, mountain (Gen) below: thunder over the mountain sounding slightly beyond the usual. Four yin lines outside, two yang caught in the middle — yin slightly predominant, fit for small matters. "Xiao Guo" is going a little beyond in small things.',
        transformInsight:
          'Its opposite is Inner Truth (#61): slight outward excess (Xiao Guo) versus inner truth (Zhong Fu). Xiao Guo is a self-inverting hexagram. Its nuclear is Preponderance of the Great (#28) — "too much of the great" mirroring "too much of the small."',
        binaryInsight:
          'Value 12, cell (row 1 = Zhen, col 4 = Gen).',
        linePositions:
          'Line 2 (yin, central and correct) fits the counsel to "settle low." Two yang caught in the middle, four yin outside — the small predominant, so "small things succeed, great things do not." "The bird should settle down": humility is auspicious.',
        modernMapping:
          'Xiao Guo: a time to go a little beyond the usual in small things — more careful, more humble, more frugal than normal — but NOT to reach for great undertakings.\n\nThe bird’s image: "settle low, do not fly high." Now bowing low and tending to details keeps you safe; nursing grand ambitions or flaunting beyond your reach meets disaster. A slight excess in the direction of humility is good.',
      },
    },
  },
  63: {
    modernShort:
      'Mọi hào đã đúng chỗ — việc vừa hoàn tất, nhưng đỉnh điểm là lúc dễ rối; giữ gìn cẩn thận kẻo trượt.',
    keywords: ['đã thành', 'hoàn tất', 'giữ gìn'],
    judgmentClassic:
      'Hanh thông ở việc nhỏ, lợi về giữ chính; ban đầu tốt nhưng cuối thì rối (既濟：亨小，利貞，初吉終亂).',
    imageClassic:
      'Nước ở trên lửa (đặt đúng thế nấu chín), là Ký Tế; người quân tử nhân đó lo nghĩ tới hoạn nạn mà phòng bị từ trước (水在火上，既濟；君子以思患而豫防之).',
    modernDeep: {
      structureInsight:
        'Nước (Khảm) ở trên, lửa (Ly) ở dưới: nước trên lửa dưới đúng thế nấu được — mọi sự đã vào đúng chỗ. "Ký tế" là đã xong, đã qua sông.',
      transformInsight:
        'Quẻ đối, quẻ đảo và quẻ hỗ đều là Vị Tế (#64): "đã xong" và "chưa xong" là cặp gương trọn vẹn nhất — soi nhau ở cả ba phép biến hóa. Hai quẻ này khép lại 64 quẻ.',
      binaryInsight:
        'Giá trị 21, ô (hàng 2 = Khảm, cột 5 = Ly). ĐẶC BIỆT: cả sáu hào đều đắc chính (dương ở vị lẻ, âm ở vị chẵn), hào 2 và 5 trung chính, cả ba cặp đều có ứng — cấu trúc "hoàn hảo" duy nhất trong 64 quẻ.',
      linePositions:
        'Sáu hào đều đúng vị, trên dưới ứng nhau trọn vẹn — không quẻ nào "chuẩn" hơn. Nhưng chính vì đã hoàn hảo nên hết chỗ tiến: "đầu tốt cuối loạn", đỉnh điểm là lúc bắt đầu trượt.',
      modernMapping:
        'Ký Tế là khoảnh khắc mọi thứ vừa vào đúng chỗ — việc đã hoàn tất, hệ thống đã cân bằng. Đẹp, nhưng nguy hiểm nằm ngay trong sự hoàn hảo đó.\n\n"Đầu tốt cuối loạn": đạt đỉnh cũng là lúc dễ buông lơi, và mọi thứ "đúng" rồi thì bước tiếp nào cũng lệch đi. Bài học: lúc thành công nhất phải "lo hoạn nạn mà phòng trước" — giữ gìn cẩn thận kẻo tuột.',
    },
    en: {
      modernShort:
        'Every line in its right place — the task just done, but the summit is where things easily unravel; guard it carefully lest it slip.',
      keywords: ['completion', 'accomplished', 'safekeeping'],
      judgmentGloss:
        'Pervading in small things, furthering through perseverance; at first good fortune, but disorder at the end (亨小，利貞，初吉終亂).',
      imageGloss:
        'Water above fire (set rightly for cooking): After Completion; the noble person accordingly thinks of trouble and guards against it beforehand (水在火上，既濟；君子以思患而豫防之).',
      modernDeep: {
        structureInsight:
          'Water (Kan) above, fire (Li) below: water over fire in the right position to cook — everything has fallen into place. "Ji Ji" is done, the river crossed.',
        transformInsight:
          'Its opposite, its reversed, AND its nuclear are all Before Completion (#64): "done" and "not yet done" are the most complete mirror pair — reflecting each other under all three transformations. These two hexagrams close the 64.',
        binaryInsight:
          'Value 21, cell (row 2 = Kan, col 5 = Li). SPECIAL: all six lines are "correct" (yang in odd places, yin in even), lines 2 and 5 central and correct, all three pairs resonate — the only "perfect" structure among the 64.',
        linePositions:
          'All six lines rightly placed, above and below fully resonating — no hexagram is more "correct." But precisely because it is already perfect, there is nowhere left to advance: "first good, then disorder" — the summit is where the slide begins.',
        modernMapping:
          'Ji Ji is the moment everything has just fallen into place — the task complete, the system in balance. Beautiful, but the danger lies within that very perfection.\n\n"First good, then disorder": to reach the peak is also when one easily relaxes, and once everything is "right," any next step tilts it off. The lesson: at your most successful, "think of trouble and guard against it beforehand" — hold it carefully lest it slip.',
      },
    },
  },
  64: {
    modernShort:
      'Sắp xong mà chưa xong — đầy hứa hẹn nhưng cần một bước cuối thận trọng; sắp đặt đúng để cán đích.',
    keywords: ['chưa thành', 'sắp hoàn tất', 'thận trọng'],
    judgmentClassic:
      'Hanh thông; con cáo nhỏ gần qua được sông thì ướt cái đuôi, không có gì lợi (未濟：亨。小狐汔濟，濡其尾，无攸利).',
    imageClassic:
      'Lửa ở trên nước (không đúng thế nấu), là Vị Tế; người quân tử nhân đó thận trọng phân biệt sự vật, đặt mỗi thứ vào đúng chỗ (火在水上，未濟；君子以慎辨物居方).',
    modernDeep: {
      structureInsight:
        'Lửa (Ly) ở trên, nước (Khảm) ở dưới: lửa bốc lên, nước chảy xuống, không gặp nhau — chưa đúng thế để thành. "Vị tế" là chưa xong, còn dở.',
      transformInsight:
        'Quẻ đối, quẻ đảo và quẻ hỗ đều là Ký Tế (#63): "chưa xong" soi gương với "đã xong" ở cả ba phép. Vị Tế khép lại 64 quẻ — một kết thúc mở, để vòng tuần hoàn lại bắt đầu.',
      binaryInsight:
        'Giá trị 42, ô (hàng 5 = Ly, cột 2 = Khảm). ĐẶC BIỆT ngược với Ký Tế: cả sáu hào đều LỆCH vị (không hào nào đắc chính), nhưng cả ba cặp vẫn có ứng — sai chỗ mà vẫn nối được nhau.',
      linePositions:
        'Sáu hào đều lệch vị (dương ở vị chẵn, âm ở vị lẻ) — chưa cái gì đúng chỗ; nhưng ba cặp đều ứng, nên vẫn có lối để sắp lại. Dở mà còn cơ hội, khác hẳn Ký Tế đã chốt.',
      modernMapping:
        'Vị Tế là "sắp xong mà chưa xong": đầy hứa hẹn nhưng còn một bước cuối. Cáo non gần qua sông lại ướt đuôi — hỏng ngay phút chót vì thiếu thận trọng.\n\nKinh Dịch kết bằng quẻ CHƯA xong (không phải đã xong) thật thâm thúy: không có cái kết tuyệt đối, mọi hoàn tất chỉ mở ra khởi đầu mới. Việc cần là "đặt mỗi thứ vào đúng chỗ" rồi kiên nhẫn đi nốt bước cuối — đích đến luôn ở phía trước.',
    },
    en: {
      modernShort:
        'Almost done but not yet — full of promise but needing one careful final step; put each thing in its right place to reach the goal.',
      keywords: ['not yet complete', 'nearing completion', 'caution'],
      judgmentGloss:
        'Pervading; the little fox, nearly across the river, gets its tail wet; nothing that furthers (亨。小狐汔濟，濡其尾，无攸利).',
      imageGloss:
        'Fire above water (not the position for cooking): Before Completion; the noble person accordingly carefully distinguishes things and puts each in its right place (火在水上，未濟；君子以慎辨物居方).',
      modernDeep: {
        structureInsight:
          'Fire (Li) above, water (Kan) below: fire rises, water sinks, the two never meet — not yet in position to succeed. "Wei Ji" is not yet done, still unfinished.',
        transformInsight:
          'Its opposite, its reversed, and its nuclear are all After Completion (#63): "not yet done" mirroring "done" under all three transformations. Wei Ji closes the 64 — an open ending, so the cycle may begin again.',
        binaryInsight:
          'Value 42, cell (row 5 = Li, col 2 = Kan). SPECIAL, the reverse of After Completion: all six lines are OUT of place (none correct), yet all three pairs still resonate — misplaced, yet still connected to each other.',
        linePositions:
          'All six lines are out of place (yang in even places, yin in odd) — nothing yet in its right spot; but all three pairs resonate, so there is still a way to set things right. Unfinished yet full of opportunity — unlike After Completion, which is already sealed.',
        modernMapping:
          'Wei Ji is "almost done but not yet": full of promise, but one final step remains. The young fox, nearly across the river, wets its tail — failing at the last moment for lack of care.\n\nThat the I Ching ends on the NOT-yet-done hexagram (rather than the done) is profound: there is no absolute ending; every completion opens a new beginning. What is needed is to "put each thing in its right place," then patiently finish the last step — the goal always lies ahead.',
      },
    },
  },
};
