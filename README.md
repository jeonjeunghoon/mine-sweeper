# MineSweeper

## 설치 및 실행 방법

[배포된 지뢰 찾기 사이트](https://mainsweeper.netlify.app/)

### 패키지 설치

```shell
yarn
```

### 로컬 실행

```shell
yarn dev
```

## To Do

- [x] 맵을 생성한다.
- [x] 첫 번째 빈칸을 열었을 경우에는 지뢰가 터지면 안된다.
- [x] 리셋 버튼을 클릭하면 모든 데이터가 초기화된다.
- [x] 오른쪽 클릭 깃발 기능
- [x] 지뢰를 제외한 모든 빈칸을 열먼 게임이 성공적으로 종료된다.
- [x] 지뢰를 열면 게임이 실패적으로 종료된다.
- [x] 지뢰 - 깃발의 수가 보인다.
- [x] 게임 타이머 구현
- [x] 난이도 변경이 가능하다.
  - [x] Beginner (8X8) 지뢰 10개
  - [x] Intermediate (16X16) 지뢰 40개
  - [x] Expert (32X16) 지뢰 100개
  - [x] Custom (가로, 세로, 지뢰 수 조정 가능)
    - [x] 설정 가능한 가로, 세로는 최대 100 x 100이며, 지뢰수는 격자칸 수의 1/3 이하로 설정 가능합니다.
    - [x] 설정 가능한 가로, 세로는 최소 1 x 1이며, 지뢰수는 격자칸 수의 1/3 이하 혹은 1 이상으로 설정 가능합니다.

## 추가 구현 사항

- [x] 난이도 데이터 저장 (브라우저 새로고침 시 유지)
- [x] 사용자 친화적인 UI/UX
  - [x] 레퍼런스와 최대한 비슷한 동작을 하도록 구현
- [ ] 양쪽 클릭 기능 (Area Open)
- [ ] 렌더링 최적화
