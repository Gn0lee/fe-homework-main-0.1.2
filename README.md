# FE interview take-home challenge 1

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Implementation

1. 클라이언트 상태관리는 jotai, 서버 상태는 react-query로 관리
2. 검색 필터는 jotai로 관리 -> 상태를 상위로 끌어와야 하는 상황이 생겨 전역상태가 더 간결하다고 판단
3. star 갱신시 optimistic update 적용
   1. starred 옵션을 선택한 상태에서 특정 location의 star를 해제하면 테이블이 리렌더링 됨.
   2. location의 데이터도 같이 optimistic update 시도하였으나 location 데이터를 DataGrid에 바로 입력하여 row가 갱신되면서 리렌더링 되는 것으로 확인되어 optimistic update 실패

## How to run

1. ```shell
   yarn
   ```
2. ```shell
   yarn start
   ```
