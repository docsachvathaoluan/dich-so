# Góp ý cho Dịch Số · Contributing

**[Tiếng Việt](#tiếng-việt) · [English](#english)**

---

## Tiếng Việt

Cảm ơn bạn đã bỏ thời gian. Đây là **nghiên cứu cá nhân của một người không phải học giả
Hán Nôm**, nên gần như chắc chắn có chỗ sai — và **việc bạn chỉ ra chỗ sai là món quà lớn
nhất** bạn có thể tặng dự án này.

Xin đọc trang này trước. Nó ngắn, và nó nói thẳng cả **những gì dự án không nhận** — biết
trước thì đỡ mất thời gian của cả hai.

### Cổng chính là Issue, không phải Pull Request

Phần lớn góp ý ở đây là chuyện **nội dung**, không phải code. Nội dung thì cần **bàn trước
khi sửa**, nên:

- **Sai nội dung, sai diễn giải, thiếu ghi chú trung thực** → **[mở Issue](https://github.com/docsachvathaoluan/dich-so/issues/new/choose)**.
- **Lỗi chính tả, lỗi hiển thị, lỗi kỹ thuật nhỏ** → mở Issue, hoặc gửi thẳng PR cũng được.
- **Sửa nội dung bằng PR mà chưa qua Issue** → xin đừng. Tôi sẽ đề nghị bạn mở Issue trước,
  và như vậy phí công bạn đã viết.

### Luật vàng: nói tôi sai thì cho tôi xem biên lai

Đây không phải thủ tục làm khó. **Đó chính là nguyên tắc của dự án, áp cho cả tôi lẫn bạn.**

> **Báo nội dung sai thì kèm nguồn: sách nào, tác giả nào, trang bao nhiêu.**

Vì trang này có thể là chỗ ai đó lần đầu tiếp xúc Kinh Dịch một cách nghiêm túc. Sửa một câu
ở đây là **thay đổi điều người lạ sẽ tin**. "Tôi nghe nói khác" hay "thầy tôi dạy vậy" chưa
đủ để làm việc đó — không phải vì bạn sai, mà vì **không ai kiểm lại được**.

Nguồn tốt, xếp theo thứ tự ưu tiên:

1. **Ngô Tất Tố — _Kinh Dịch trọn bộ_** (bản neo của dự án này). Ghi rõ quẻ/hào.
2. **Kinh văn gốc** (Chu Dịch, Thập Dực) và chú giải **Trình Di / Chu Hy**.
3. Các bản dịch học thuật khác: **Legge**, **Wilhelm**, Phan Bội Châu, Nguyễn Hiến Lê…
4. **Phép tính bạn tự làm** — cái này thì **khỏi cần sách**: cứ đưa con số ra đây và tôi
   cộng lại. Đây là loại biên lai mạnh nhất trong dự án này.

Nếu các sách **mâu thuẫn nhau** — chuyện rất thường — thì đó **không phải lỗi cần sửa**, mà
là **dị bản cần ghi chú**. Cứ mở Issue, ta sẽ ghi rõ rằng có nhiều cách hiểu và ai nói gì.
Đó chính là làm đúng.

### Ngoài phạm vi — nói trước cho rõ

Những thứ dưới đây **sẽ bị từ chối**, không phải vì chúng vô giá trị, mà vì **chúng không
phải việc của trang này**. Đây là quyết định chủ ý, không phải thiếu sót:

- ❌ **Bói toán, xem vận mệnh, luận giải số phận cá nhân.** Trang này bàn *quy luật vận hành*,
  không phán đoán tương lai ai cả. Mục "cách lập quẻ" chỉ minh hoạ **cơ chế ngẫu nhiên →
  nhị phân**, và sẽ giữ nguyên như vậy.
- ❌ **Phong thuỷ ứng dụng, chọn ngày, đặt tên, xem tuổi.**
- ❌ **Nêu diễn giải truyền thống như định lý.** Muốn thêm thì được — nhưng phải **kèm nguồn
  và được ghi chú rõ là diễn giải**.
- ❌ **"Trùng hợp số học" không kiểm được bằng phép tính.** Dự án đã **loại một cái vì sai**
  (xem README). Cái của bạn cũng sẽ được kiểm y như vậy.
- ❌ **Tranh cãi môn phái ai đúng ai sai.** Có dị bản thì **ghi cả hai và dẫn nguồn**, không
  phân xử.
- ❌ **Đổi giọng thành huyền bí.** Hiện đại làm chính, cổ làm phụ — đó là lý do trang này tồn tại.

### Ai quyết định cuối cùng

**Tôi** — dự án chỉ có một người biên tập. Không phải để độc đoán, mà vì **sự nhất quán về
giọng văn và về ranh giới "cái gì kiểm được / cái gì là diễn giải" chính là toàn bộ giá trị
của trang này**. Mở cửa cho mọi hướng thì nó thành một trang Kinh Dịch tạp nham như bao trang
khác trên mạng.

Nghĩa là: tôi có thể **cảm ơn bạn nhưng vẫn nói không**, kể cả khi bạn đúng về mặt học thuật —
nếu nó kéo dự án lệch khỏi mục đích. Xin đừng coi đó là xem thường công sức bạn.

Và tôi là một người, làm việc này ngoài giờ. **Trả lời có thể chậm.** Cứ kiên nhẫn.

### Nếu bạn gửi Pull Request

Nhận PR cho: **lỗi chính tả · lỗi hiển thị · lỗi kỹ thuật · cải thiện khả năng truy cập ·
bản dịch tiếng Anh sai**.

Trước khi gửi:

```bash
npm test         # bắt buộc — có phần kiểm ràng buộc số liệu
npm run build    # bắt buộc — kiểm kiểu
```

Vài điều nên biết:

- Bộ kiểm tra **canh các ràng buộc số liệu** (64 quẻ phải phủ đủ mã 0–63, bảng thuật ngữ phải
  đủ 8 + 64…). Nếu nó báo đỏ, khả năng cao là **có số liệu đã lệch**, không phải test khó tính.
- **Chữ hiển thị trên trang có luật riêng**, và có phần kiểm tự động canh: không đưa đường dẫn
  file, từ ngữ nghề nghiệp hay nhãn nội bộ ra trước mặt người đọc.
- Quy ước mã hoá **không được đổi**: `lines[]` xếp **đáy → đỉnh**, **bit đáy = LSB**
  (Càn = 111111 = 63, Khôn = 0). Rất nhiều thứ dựa lên nó.
- Sửa **một việc mỗi PR**. PR gộp nhiều thứ sẽ bị đề nghị tách.

### Gửi kèm đóng góp là bạn đồng ý

Nội dung bạn đóng góp sẽ ra theo **[CC BY 4.0](LICENSE-CONTENT.md)**, mã nguồn theo
**[MIT](LICENSE)** — giống phần còn lại của kho. Cứ gửi là xem như bạn đồng ý điều đó.

---

## English

Thank you for spending time on this. This is **the personal research of someone who is not a
classical Chinese scholar**, so there is almost certainly something wrong in here — and
**pointing out what's wrong is the most valuable gift** you can give this project.

Please read this page first. It's short, and it states plainly **what this project won't
accept** — knowing up front saves us both time.

### Issues are the front door, not pull requests

Most feedback here concerns **content**, not code. Content is worth **discussing before it's
changed**, so:

- **Wrong content, wrong reading, a missing honesty note** → **[open an Issue](https://github.com/docsachvathaoluan/dich-so/issues/new/choose)**.
- **Typos, display glitches, small technical bugs** → open an Issue, or send a PR directly.
- **A PR changing content without an Issue first** → please don't. I'll ask you to open an
  Issue anyway, and your writing effort will have been wasted.

### The golden rule: if I'm wrong, show me the receipt

This isn't bureaucracy. **It is the project's own principle, applied to both of us.**

> **Report a content error with a source: which book, which author, which page.**

This site may be where someone meets the I Ching seriously for the first time. Changing a
sentence here **changes what a stranger will believe**. "I heard otherwise" or "my teacher
taught it differently" isn't enough for that — not because you're wrong, but because
**nobody can check it**.

Good sources, in order of weight here:

1. **Ngô Tất Tố — _Kinh Dịch trọn bộ_** (this project's anchor text). Name the hexagram/line.
2. **The canon itself** (*Zhou Yi*, the Ten Wings) and the **Cheng Yi / Zhu Xi** commentaries.
3. Other scholarly translations: **Legge**, **Wilhelm**, Phan Bội Châu, Nguyễn Hiến Lê…
4. **Arithmetic you did yourself** — this needs **no book at all**: put the numbers here and
   I'll add them up. It's the strongest kind of receipt in this project.

If sources **contradict each other** — which is common — that is **not a bug to fix**. It's a
**variant to annotate**. Open an Issue and we'll record that readings differ and who says what.
That *is* the correct outcome.

### Out of scope — said plainly

The following **will be declined**, not because they're worthless, but because **they aren't
what this site is for**. These are deliberate choices, not oversights:

- ❌ **Fortune-telling, divination, reading someone's fate.** This site is about *how things
  move*, not about predicting anyone's future. The "how a hexagram is cast" section only
  illustrates the **randomness → binary mechanism**, and will stay that way.
- ❌ **Applied feng shui, date selection, naming, zodiac compatibility.**
- ❌ **Stating traditional interpretation as theorem.** You may add it — but it must be
  **sourced and marked as interpretation**.
- ❌ **"Numerical coincidences" that don't survive arithmetic.** One has already been **cut for
  being false** (see the README). Yours will get the same check.
- ❌ **Adjudicating which school is right.** Where readings differ, we **record both with
  sources**; we don't rule.
- ❌ **Turning the voice mystical.** Modern first, classical second — that's why this exists.

### Who decides

**I do** — this project has a single editor. Not to be autocratic, but because **consistency
of voice, and of the line between "checkable" and "interpretation", is the entire value of
this site**. Open it to every direction and it becomes just another muddled I Ching page.

Which means: I may **thank you and still say no**, even when you're academically right, if it
pulls the project off its purpose. Please don't read that as disrespect for your effort.

Also, I'm one person doing this in my spare time. **Replies may be slow.** Please be patient.

### If you send a pull request

PRs are welcome for: **typos · display glitches · technical bugs · accessibility fixes ·
errors in the English translation**.

Before you send:

```bash
npm test         # required — includes data-invariant checks
npm run build    # required — type-checks
```

A few things worth knowing:

- The test suite **guards data invariants** (the 64 hexagrams must cover codes 0–63 exactly,
  the glossary must hold 8 + 64 entries…). If it goes red, the likely cause is **data that has
  drifted**, not a fussy test.
- **The words shown on the site follow their own rules**, and a check enforces them: no file
  paths, no jargon, no internal labels in front of a reader.
- The encoding convention **must not change**: `lines[]` runs **bottom → top**, the **bottom
  bit is the LSB** (Qian = 111111 = 63, Kun = 0). A great deal rests on it.
- **One concern per PR.** Bundled PRs will be asked to split.

### By contributing, you agree

Content you contribute is released under **[CC BY 4.0](LICENSE-CONTENT.md)** and code under
**[MIT](LICENSE)** — the same as the rest of the repository. Sending a contribution means you
accept that.
