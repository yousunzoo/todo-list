# 🗒️ 투두 리스트

데모 사이트 : [투두 리스트](https://todo-list-yousunzoo.netlify.app/)

작업 기간 : 2023.01.16 ~ 2023.01.23

사용 언어 : HTML, SCSS, Javascript

사용 라이브러리 및 플러그인 : `autoprefixer`, `postcss`, `sortableJS`

목표 : 주어진 API를 활용해 서버에 저장되는 투두리스트 페이지 구현


## 요구사항

### ❗ 필수

- [X] 할 일 목록(List)이 출력돼야 합니다.
- [X] 할 일 항목(Item)을 새롭게 추가할 수 있어야 합니다.
- [X] 할 일 항목을 수정할 수 있어야 합니다.
- [X] 할 일 항목을 삭제할 수 있어야 합니다.
- [X] jQuery, React, Vue 등 JS 라이브러리와 프레임워크는 사용하지 않아야 합니다.
- [X] 실제 서비스로 배포하고 접근 가능한 링크를 추가해야 합니다.

### ❔ 선택

- [X] 할 일 항목의 순서를 바꿀 수 있도록 만들어보세요.([SortableJS](http://sortablejs.github.io/Sortable/))
- [X] 할 일을 완료하지 않은 항목과 완료한 항목을 분류해서 출력해보세요.
- [X] 할 일을 완료한 항목을 한 번에 삭제할 수 있도록 만들어보세요.
- [ ] 할 일 항목의 최신 수정일을 표시해보세요.
- [X] 할 일 목록이 출력되기 전에 로딩 애니메이션이 보이도록 만들어보세요.
- [X] 기타 동작이 완료되기 전에 로딩 애니메이션이 보이도록 만들어보세요.
- [X] 차별화가 가능하도록 프로젝트를 최대한 예쁘게 만들어보세요.
- [X] 할 일과 관련된 기타 기능도 고려해보세요.

---
## ✨ 사이트 소개
![image](https://user-images.githubusercontent.com/102499959/214039586-b35438cc-8567-4a50-b0ce-0848421b0e32.png)
- 노트 디자인으로 다이어리를 사용하는 듯한 느낌을 줬습니다. (가운데 스프링 디자인도 `HTML`, `CSS` 사용해서 구현)
- 왼쪽 페이지는 달력, 랜덤 명언 출력을 구현하였습니다.
- 오른쪽 페이지는 투두 리스트와 디데이를 구현하였습니다.
- 서버에 저장된 일정이 없을 때, 투두 리스트 대신 일정 추가 메시지가 나타납니다.
<br><br><br>
### 📅 달력 기능
![calendar](https://user-images.githubusercontent.com/102499959/214040733-40bdbbee-3cfb-4500-a21e-c241be9c81ed.gif)
- `new Date()` 함수와 `for` 문을 통해 달력을 구현했습니다.
- 오늘 날짜에는 동그라미 표시가 되어있습니다.
- `CSS`의 `:nth-child(n)` 속성을 활용해 일요일은 빨간색, 토요일은 파란색으로 표현했습니다.
- 버튼을 클릭 시 다음 달과 지난 달의 달력을 볼 수 있습니다.
<br><br><br>
### 🍀 랜덤 명언 기능
![advice](https://user-images.githubusercontent.com/102499959/214042025-df54d6bd-dfe1-49eb-8c23-36cbaf3d0b19.gif)
- 새로고침할 때마다 랜덤 명언 API(https://api.adviceslip.com/advice)로부터 1~4 줄 내의 명언을 받아 출력합니다.
- 서버로부터 응답받기 전까지 로딩 애니메이션이 나옵니다.

```javascript
async function getAdvice() {
  await fetch("https://api.adviceslip.com/advice")
    .then((response) => response.json())
    .then((data) => {
      let advice = data.slip.advice;
      setAdvice(advice);
    });
}
```
<br><br><br>
## 투두 리스트
### 🗒️ 일정 추가
![add_todo](https://user-images.githubusercontent.com/102499959/214044314-f41aab3c-4a7f-4824-a9d8-2edae0321db9.gif)
- 추가 버튼을 클릭하면 모달 창이 등장하며 `input`에 자동으로 focus 처리됩니다.
- 일정이 하나라도 있으면 일정 추가 메시지가 사라지고 투두 리스트가 등장합니다.
- 일정 추가 `input`에 값을 입력하지 않으면 `placeholder`의 색상이 빨간 색으로 바뀝니다.
- 일정이 셋팅되는 동안 애니메이션이 나옵니다.
<br><br><br>
### ✏️ 일정 수정
![edit_todo](https://user-images.githubusercontent.com/102499959/214045460-56916a0d-5b53-4b97-8dcf-f19d001feef4.gif)
- 수정 버튼에 `hover`시 버튼이 `png`에서 `gif`로 바뀌면서 움직입니다.
- 수정 버튼을 클릭하면 모달 창이 등장하며, 기존 일정을 수정할 수 있도록 합니다.
<br><br><br>
### 🗑️ 일정 삭제
![delete_todo](https://user-images.githubusercontent.com/102499959/214046107-65f76729-013a-448e-9dd1-4a5605045d44.gif)
- 삭제 버튼에 `hover`시 버튼이 `png`에서 `gif`로 바뀌면서 움직입니다.
- 삭제 버튼을 누르면 해당 일정이 삭제되고 투두 리스트가 `reload`됩니다.
- 모두 삭제 버튼을 누르면 모달창이 등장하며 모두 삭제할 것인지 확인하고, 예 버튼을 누르면 모든 일정을 삭제합니다.
<br><br><br>
### 👀 일정 보기 및 정렬
![sort_todo](https://user-images.githubusercontent.com/102499959/214046913-ce77435a-6d57-43b5-8ecc-5ee608076238.gif)
- `input type='checkbox'`와 `label`을 사용해 `input`의 모양을 커스터마이징했습니다.
- 보기 탭은 모두 보기, 완료한 일, 해야할 일 총 세 가지 옵션으로 구성되어 있습니다.
- `select`와 `option`은 디자인의 한계가 있어 `div`로 구현했습니다.
- 체크박스를 클릭하면 투두에 줄을 그으며 완료한 일로 넘어갑니다.
- 다시 클릭하면 줄이 사라지며 해야할 일로 넘어갑니다.
<br><br><br>
![sort_todo2](https://user-images.githubusercontent.com/102499959/214047846-56b1679b-9cc1-49b9-9f93-5545c19393ca.gif)
- 정렬 탭은 최신 순, 오래된 순, 사용자 지정 순 총 세 가지 옵션으로 구성되어 있습니다.
- `sortableJS`를 사용하여 사용자가 순서를 지정할 수 있습니다.
<br><br><br>
### 🖱️ 스크롤
![scroll_todo2](https://user-images.githubusercontent.com/102499959/214048637-92f44289-54ea-4d87-a183-db9ce2913772.gif)
- 투두 리스트가 7개 이상이 되면 스크롤이 생깁니다.
- 스크롤을 `CSS`를 통해 커스터마이징했습니다.
<br><br><br>
### 디데이 기능
![dday](https://user-images.githubusercontent.com/102499959/214049308-ecb5e46b-58e2-44d5-8c6b-d8dbeef60409.gif)
![image](https://user-images.githubusercontent.com/102499959/214049479-6966ff24-ba5f-4e8a-8f1b-433e6255b64a.png)
- 디데이 추가 버튼을 누르면 디데이 모달 창이 등장합니다.
- 날짜를 입력하는 `input`은 `type="date"`를 지정하여 날짜만 선택할 수 있도록 했습니다.
- `input`에 `required` 속성을 부여해서 필수 입력되도록 했지만, 완료 버튼 클릭 시 `e.preventDefault()` 메서드를 사용하니 `submit` 되지 않으면서 필수 입력 요구 알림이 사라지는 것을 확인했습니다. `required` 속성 대신 버튼을 눌렀을 때 해당 `input`에 값이 없으면 `placeholder`가 빨간 색 처리되도록 했습니다.
- 디데이는 ` Math.ceil((new Date(date) - new Date()) / (1000 * 60 * 60 * 24));`을 통해서 구현했습니다. 
- 완료 버튼 클릭 시 화면 구현 동시에 `localStorage`에 디데이 값이 저장됩니다.
- 창을 새로 켜거나 새로고침했을 때 `localStorage`에 디데이 값이 있으면 디데이 추가는 보여지지 않고, 세팅된 디데이가 보여집니다.
- 수정 버튼을 통해 디데이를 수정할 수 있습니다.
---
## 📝 Review
- 모듈화를 한다고는 했지만 어느 기능 단위로 모듈화를 해야하는지 아직 감이 잡히지 않습니다. 학습과 연습을 통해서 능숙해질 수 있으면 좋겠습니다.
- 달력 구현 시 `next`, `prev` 버튼을 `renderCalendar()` 함수 안에 넣어 재귀 함수로 표현하니 로딩이 오래 걸리는 이슈가 발생했습니다. 때문에 `next`, `prev` 버튼을 `renderCalendar()` 외부에서 따로 함수 처리하니 해당 이슈가 사라졌습니다. 자료구조 공부의 필요성을 깨닫게 되는 순간이었습니다.
- 디자인 때문에 반응형 레이아웃을 구현하지 못한 것에 대한 아쉬움이 있습니다. 추후 모바일/태블릿을 위한 적응형 웹사이트를 구현해보겠습니다.
