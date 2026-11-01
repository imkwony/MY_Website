# Changkwon Lee — Personal Website

GitHub Pages로 배포되는 정적 웹사이트입니다. 빌드 과정이 없고, 파일을 고쳐서 push 하면 반영됩니다.

- 사이트 주소: https://imkwony.github.io/MY_Website/
- 저장소: https://github.com/imkwony/MY_Website

## 폴더 구조

```
index.html              ← 모든 내용 (About, News, Publications, ...)
css/style.css           ← 디자인 (색상은 맨 위 :root 에서 변경)
js/main.js              ← News 더보기 버튼
assets/profile.jpg      ← 프로필 사진 (같은 이름으로 교체하면 바뀜)
assets/Changkwon_Lee_CV.pdf  ← CV 탭에서 내려받는 파일
cv/cv.html              ← CV PDF를 만드는 원본
```

## 처음 배포하기

```bash
git init
git branch -M main
git remote add origin https://github.com/imkwony/MY_Website.git
git add .
git commit -m "Initial website"
git push -u origin main
```

그다음 GitHub 저장소 → **Settings → Pages → Build and deployment**에서
Source를 `Deploy from a branch`, Branch를 `main` / `(root)`로 지정하고 Save 합니다.
1~2분 뒤 사이트 주소로 접속됩니다.

## 수정 후 반영하기

```bash
git add .
git commit -m "Update ..."
git push
```

## 무엇을 어떻게 고치나

`index.html`에서 섹션은 `id`로 찾을 수 있습니다 (`id="news"`, `id="publications"` 등).

### 논문 추가
`id="publications"` 섹션에서 `<article class="pub">` 블록 하나를 복사해 **맨 위**(최신순)에 붙여넣고 내용을 바꿉니다.

```html
<article class="pub">
  <div class="tag">AAAI 2027</div>            <!-- 학회/연도 (중요 논문은 class="tag", 일반은 class="tag alt") -->
  <div>
    <h3>논문 제목</h3>
    <div class="authors">A, <b>Changkwon Lee</b>, B</div>   <!-- 내 이름은 <b>로 강조 -->
    <div class="venue">학회/저널명, 연도</div>
    <div class="links">                                      <!-- 링크가 없으면 이 줄 전체 삭제 -->
      <a class="btn" href="https://doi.org/...">DOI</a>
      <a class="btn" href="https://arxiv.org/...">Paper</a>
      <a class="btn" href="https://github.com/...">Code</a>
    </div>
  </div>
</article>
```

특허는 같은 섹션의 `Patent` 아래에 같은 형식으로 추가합니다.

### News 추가
`id="news"` 섹션의 `<ul class="news">` 맨 위에 한 줄을 추가합니다.

```html
<li><span class="date">Mar 2027</span><span>소식 내용</span></li>
```

최신 5개만 보이고 나머지는 "Show all"로 펼쳐집니다. 오래된 항목은 `<li class="extra">`로 바꾸면 접힙니다.

### 수업/수업자료 추가 (Teaching 페이지)
메인의 Teaching 버튼은 `teaching.html`로 이동합니다. 수업은 연도별 표(Term, Course, Institution, Materials, Note)에 있고,
`<tr>` 한 줄을 복사해 해당 연도 표에 붙여넣으면 됩니다. 새 연도는 `<h2 class="year">`와 표 전체를 복사합니다.

Materials 칸에는 셋 중 하나를 씁니다.

```html
<a class="btn" href="URL">Materials</a>                          <!-- 공개 링크 -->
<a class="btn lock" href="#" data-protected="URL">Materials 🔒</a>  <!-- 로그인 필요 -->
<span class="none">—</span>                                      <!-- 자료 없음 -->
```

페이지 맨 아래 **Materials in Progress**에 제작 중인 자료(예: Causal AI)를 두고, 완성되면 해당 연도 표로 옮깁니다.

**로그인 보호 링크**: ID는 `admin`, 비밀번호는 `js/gate.js`의 해시값으로 검사합니다.
비밀번호를 바꾸려면 새 비밀번호의 SHA-256 값을 구해 `GATE_HASH`에 넣습니다.

```bash
printf 'newpassword' | sha256sum
```

> 정적 사이트라 이 보호는 "링크를 눈에 안 띄게 하는 수준"입니다. 페이지 소스를 보면 URL은 확인할 수 있습니다.
> 정말 비공개로 하려면 GitHub 저장소(`Reading_a_Book-CausalAI`)를 Private으로 설정하세요.

### Authored Materials 추가
`id="experience"` 섹션의 `Authored Materials` 아래에 `<div class="tl">` 블록을 추가합니다. (생성형 AI 가이드라인, 교과서 등)

### Education / Experience 추가
`<div class="tl">` 블록 하나를 복사해 원하는 위치에 붙여넣고 기간(`when`), 제목(`h3`), 설명(`p`)을 바꿉니다.

### 프로필 사진 교체
`assets/profile.jpg`를 같은 이름으로 덮어씁니다. 얼굴이 원 안에서 잘리면 `css/style.css`의 `.avatar`에서 `object-position` 값(예: `50% 30%`)을 조정합니다.

### 연락처/링크 변경
`index.html` 맨 위 hero 영역의 `.links` 버튼들과 맨 아래 footer를 수정합니다.

### 색상 변경
`css/style.css` 맨 위 `:root`의 값을 바꿉니다. `--crimson`(크림슨), `--beige`/`--cream`(베이지) 계열입니다.

## CV 업데이트

CV 탭은 `assets/Changkwon_Lee_CV.pdf`를 내려받게 합니다. PDF는 `cv/cv.html`로 만듭니다.

1. `cv/cv.html`의 내용을 수정합니다 (논문·경력 추가 등).
2. PDF로 다시 만듭니다. Windows에서는 아래 명령을 프로젝트 폴더에서 실행합니다.

```bash
"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless=new --no-pdf-header-footer --print-to-pdf="assets\Changkwon_Lee_CV.pdf" "cv\cv.html"
```

   명령이 어려우면 `cv/cv.html`을 브라우저에서 열고 **인쇄 → PDF로 저장**(머리글/바닥글 해제)한 뒤 `assets/Changkwon_Lee_CV.pdf`로 덮어써도 됩니다.
3. `git add . && git commit -m "Update CV" && git push`

## 로컬에서 미리보기

`index.html`을 더블클릭해 브라우저에서 열면 됩니다.
