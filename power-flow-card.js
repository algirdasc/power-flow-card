import { LitElement, html, css, svg } from "https://unpkg.com/lit?module";

class PowerFlowCard extends LitElement {
  static get properties() {
    return {
      hass: {
        type: Object,
      }, // Home Assistant object (for state)
      config: {
        type: Object,
      }, // User configuration (entities)
    };
  }

  constructor() {
    super();
    this.svgPaths = {
      primary:
        "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDExMzkgNzU2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDsiPgogICAgPGcgaWQ9IlNlaXRlLTEiIHNlcmlmOmlkPSJTZWl0ZSAxIiB0cmFuc2Zvcm09Im1hdHJpeCgxLjg2MDg3MSwwLDAsMC45NTQ0MjEsMCwwKSI+CiAgICAgICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjYxMiIgaGVpZ2h0PSI3OTIiIHN0eWxlPSJmaWxsOm5vbmU7Ii8+CiAgICAgICAgPGNsaXBQYXRoIGlkPSJfY2xpcDEiPgogICAgICAgICAgICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iNjEyIiBoZWlnaHQ9Ijc5MiIvPgogICAgICAgIDwvY2xpcFBhdGg+CiAgICAgICAgPGcgY2xpcC1wYXRoPSJ1cmwoI19jbGlwMSkiPgogICAgICAgICAgICA8ZyBpZD0icG93ZXJsaW5lLWdyaWQiIHNlcmlmOmlkPSJwb3dlcmxpbmUgZ3JpZCIgdHJhbnNmb3JtPSJtYXRyaXgoMS4wNzQ3NjYsMCwwLDIuMDk1NTExLDAsLTQyNS4wNzU4NjQpIj4KICAgICAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0ibWF0cml4KDEsMCwwLDEsMzc2Ljk0NzksNDQxLjQ4OTYpIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMCwwTDMuMDEyLDBMMCwwWiIgc3R5bGU9ImZpbGw6d2hpdGU7ZmlsbC1ydWxlOm5vbnplcm87Ii8+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgtMSwwLDAsMSwzNzYuOTQ3OCw0NDEuNDg5MykiPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0tMy4wMTIsMEwwLDAiIHN0eWxlPSJmaWxsOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOmJsYWNrO3N0cm9rZS13aWR0aDoxcHg7Ii8+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLDAsMCwxLDM3OC42MjA5LDU3MC42NjUzKSI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTAsLTEyOS4xNzZDMCwtMTI5LjE3NiAwLjQzOCwtMTEwLjUyMiAtMC4xNjcsLTEwMS4zNjRDLTAuNjE3LC05NC41NTggNi4yMjYsLTkyLjExMSA5LjAzNSwtODkuNzZDMTUuNjI0LC04NC4yNDggNTAuNjU2LC03MC43NzYgNTAuNjU2LC03MC43NzZDNTAuNjU2LC03MC43NzYgNjUuMTUxLC02NS4xMjkgNTUuMzYyLC02Mi44N0M0NS41NzQsLTYwLjYxMSAtMjg1LjYyNSwwIC0yODUuNjI1LDAiIHN0eWxlPSJmaWxsOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOnJnYigxMjcsMTI3LDEyNyk7c3Ryb2tlLXdpZHRoOjVweDsiLz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==", // grid_line.svg
      out: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDExMzkgNzU2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDsiPgogICAgPGcgaWQ9IlNlaXRlLTEiIHNlcmlmOmlkPSJTZWl0ZSAxIiB0cmFuc2Zvcm09Im1hdHJpeCgxLjg2MDg3MSwwLDAsMC45NTQ0MjEsMCwwKSI+CiAgICAgICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjYxMiIgaGVpZ2h0PSI3OTIiIHN0eWxlPSJmaWxsOm5vbmU7Ii8+CiAgICAgICAgPGNsaXBQYXRoIGlkPSJfY2xpcDEiPgogICAgICAgICAgICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iNjEyIiBoZWlnaHQ9Ijc5MiIvPgogICAgICAgIDwvY2xpcFBhdGg+CiAgICAgICAgPGcgY2xpcC1wYXRoPSJ1cmwoI19jbGlwMSkiPgogICAgICAgICAgICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLjA3NDc2NiwwLDAsMi4wOTU1MTEsNDEzLjAyMzY3NSw2MTQuMzU4MDU4KSI+CiAgICAgICAgICAgICAgICA8ZyBpZD0icG93ZXJsaW5lLW91dHNpZGUiIHNlcmlmOmlkPSJwb3dlcmxpbmUgb3V0c2lkZSI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTAsLTcxLjIzMUwxNy44OCwtNzQuNDQ1QzE3Ljg4LC03NC40NDUgMjIuOTYyLC03My41MDQgMjMuMjQ0LC02Ny4xOThDMjMuNTI3LC02MC44OTMgMjQuNzA5LC0yNS4wMDIgMjQuNzA5LC0yNS4wMDJDMjQuNzA5LC0yNS4wMDIgMjYuOTE1LC0yMS4wODEgMzAuMzAzLC0xOS42NjlDMzIuMjkyLC0xOC44NCA1MC41MzUsLTExLjAwNCA2NS4yNiwtNC42NzRDNzEuMTQsLTIuMTQ3IDc2LjQ2LDAuMTQxIDc5Ljk1OSwxLjY0NkM4Mi43NTMsMi44NDcgODUuODI4LDMuMjE0IDg4LjgyNywyLjcwN0wxNzcuNzA4LC0xMi4zMjgiIHN0eWxlPSJmaWxsOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOnJnYigxMjcsMTI3LDEyNyk7c3Ryb2tlLXdpZHRoOjVweDsiLz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==", // grid_out.svg
      solar:
        "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDExMzkgNzU2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDsiPgogICAgPGcgaWQ9IlNlaXRlLTEiIHNlcmlmOmlkPSJTZWl0ZSAxIiB0cmFuc2Zvcm09Im1hdHJpeCgxLjg2MDg3MSwwLDAsMC45NTQ0MjEsMCwwKSI+CiAgICAgICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjYxMiIgaGVpZ2h0PSI3OTIiIHN0eWxlPSJmaWxsOm5vbmU7Ii8+CiAgICAgICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMC4wMDI0MzksLTIuMDk1NTA1LC0xLjA3NDc2MywtMC4wMDQ3NTYsNDQyLjg5NzM1OSwyOTIuMDEwNzU2KSI+CiAgICAgICAgICAgIDxnIGlkPSJwb3dlcmxpbmUtc29sYXIiIHNlcmlmOmlkPSJwb3dlcmxpbmUgc29sYXIiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTS02Ni42NTgsMzMuNDgyTC0yNy44ODIsMzMuNDgyQy0yMi4yODcsMzMuMjk0IC0xNC41OTEsMzMuNjggLTUuODg0LDM2LjE2M0M4LjM2Miw0MC4yMjYgMTQuOTg0LDQ4LjAxMyAyMC4wNzQsNTIuNjkxQzI0LjI5Nyw1Ni42NzQgMjkuMzM1LDYzLjExNSAzMy41NTgsNjcuMDk5IiBzdHlsZT0iZmlsbDpub25lO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTpyZ2IoMTI3LDEyNywxMjcpO3N0cm9rZS13aWR0aDo1cHg7Ii8+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=", // solar_line.svg
      battery:
        "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDExMzkgNzU2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDsiPgogICAgPGcgaWQ9IlNlaXRlLTEiIHNlcmlmOmlkPSJTZWl0ZSAxIiB0cmFuc2Zvcm09Im1hdHJpeCgxLjg2MDg3MSwwLDAsMC45NTQ0MjEsMCwwKSI+CiAgICAgICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjYxMiIgaGVpZ2h0PSI3OTIiIHN0eWxlPSJmaWxsOm5vbmU7Ii8+CiAgICAgICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoLTEuMDU3NzI3LDAuMzcxNjUzLDAuMTkwNjE3LDIuMDYyMjksMzc1LjAyMjUzOCw0ODIuMjkzMDQpIj4KICAgICAgICAgICAgPGcgaWQ9InBvd2VybGluZS1iYXR0ZXJ5IiBzZXJpZjppZD0icG93ZXJsaW5lIGJhdHRlcnkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTS0yMy42NSwtMi4xMTRMMC4xODksLTIuMTE0IiBzdHlsZT0iZmlsbDpub25lO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTpyZ2IoMTI3LDEyNywxMjcpO3N0cm9rZS13aWR0aDo1cHg7Ii8+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=",
      ev: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+Cjxzdmcgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDExMzkgNzU2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zOnNlcmlmPSJodHRwOi8vd3d3LnNlcmlmLmNvbS8iIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDsiPgogICAgPGcgaWQ9IlNlaXRlLTEiIHNlcmlmOmlkPSJTZWl0ZSAxIiB0cmFuc2Zvcm09Im1hdHJpeCgxLjg2MDg3MSwwLDAsMC45NTQ0MjEsMCwwKSI+CiAgICAgICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjYxMiIgaGVpZ2h0PSI3OTIiIHN0eWxlPSJmaWxsOm5vbmU7Ii8+CiAgICAgICAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMS4wNzQ3NjYsMCwwLDIuMDk1NTExLDM0Ny44Nzc2MDcsNDkwLjY3MjgzOCkiPgogICAgICAgICAgICA8ZyBpZD0icG93ZXJsaW5lLWhvdXNlIiBzZXJpZjppZD0icG93ZXJsaW5lIGhvdXNlIj4KICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0wLC0xLjMwNEwtMzAuMjEyLDUuNDcyTC02NS41MDYsLTYuNzc2TC04Mi4xOTQsLTYuMDEiIHN0eWxlPSJmaWxsOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOnJnYigxMjcsMTI3LDEyNyk7c3Ryb2tlLXdpZHRoOjVweDsiLz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==",
      bg: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj48c3ZnIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAyMzc1IDE1ODQiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM6c2VyaWY9Imh0dHA6Ly93d3cuc2VyaWYuY29tLyIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1taXRlcmxpbWl0OjEwOyI+PHJlY3QgaWQ9IlNlaXRlLTIiIHNlcmlmOmlkPSJTZWl0ZSAyIiB4PSIwIiB5PSIwIiB3aWR0aD0iMjM3NSIgaGVpZ2h0PSIxNTgzLjMzMyIgc3R5bGU9ImZpbGw6bm9uZTsiLz48Y2xpcFBhdGggaWQ9Il9jbGlwMSI+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjIzNzUiIGhlaWdodD0iMTU4My4zMzMiLz48L2NsaXBQYXRoPjxnIGNsaXAtcGF0aD0idXJsKCNfY2xpcDEpIj48ZyBpZD0iTGF5ZXItMSIgc2VyaWY6aWQ9IkxheWVyIDEiPjwvZz48ZyBpZD0iaG91c2UiPjxwYXRoIGQ9Ik0xMDQwLjQyMiwxMTEzLjczOWwxOTcuNjQ2LDgyLjM1NGw5MDUuODgzLC0xNTIuOTQybDAsLTQ0MS4yMTJsLTQwMi4zNTQsLTI2OS4zNzVsLTUwMy41MjksNDQyLjM1NGwtMjA5LjU5MiwtODcuNTY3bC00NjguMDU0LDk0LjYyNWwtMzUyLjA4NywtMTQ1Ljg4M2wwLDM5Ny42NDZsMjkwLjkxMiwxMzEuNzY3YzAsMCAxMDUuODgzLDU4LjgyMSAxMDguMjMzLDcuMDU4YzIuMzU0LC01MS43NjcgLTIuMzUsLTM0OC4yMzcgLTIuMzUsLTM0OC4yMzdsNDAyLjM1LC03NC45MjFsLTIuMzU0LDM2NC4zMzNsMzUuMjk2LDBaIiBzdHlsZT0iZmlsbDojZTdlYWVmO2ZpbGwtcnVsZTpub256ZXJvOyIvPjwvZz48ZyBpZD0icm9vZiI+PHBhdGggZD0iTTEzNDEuMTIxLDY4NC45NTVsMzYyLjgyOSwtMzE0Ljc0MmMwLDAgMjUuODgzLC0zNS4yOTYgODQuNzA0LDBjNTguODI1LDM1LjI5MiA0MjEuMTc5LDI3NS4yOTIgNDIxLjE3OSwyNzUuMjkyYzAsMCA0Ny4wNTgsLTcuMDU4IDIxLjE3NSwtMzAuNTg3Yy0yNS44ODMsLTIzLjUyOSAtNDc3LjY0NiwtMzIwIC00NzcuNjQ2LC0zMjBsLTc0NS44ODMsLTI3MC41ODhsLTUwOC4yMzMsNDQyLjM1bDczOC44MjEsMzA4LjIzOGMwLDAgLTAuOTA4LDAuMjIxIDEwMy4wNTQsLTg5Ljk2MyIgc3R5bGU9ImZpbGw6I2M1NTQyZjtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6I2M1NTQyZjtzdHJva2Utd2lkdGg6MzRweDtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7Ii8+PHBhdGggZD0iTTU1MS44ODUsNDg4LjY0Mmw0NzYuNTkyLDE5OC43MDhsLTQ2OC4wNTQsOTQuNjI1bC0zNTIuMDg4LC0xNDUuODgzbDAsLTkxLjc2MmwzNDMuNTUsLTU1LjY4OFoiIHN0eWxlPSJmaWxsOiNhODQ1MjU7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOiNhODQ1MjU7c3Ryb2tlLXdpZHRoOjM0cHg7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1saW5lY2FwOnJvdW5kOyIvPjwvZz48ZyBpZD0icm9vZi1nYXJhZ2UiIHNlcmlmOmlkPSJyb29mIGdhcmFnZSI+PC9nPjxnIGlkPSJ3aW5kb3dzIj48cGF0aCBkPSJNMTc4OC42NTYsNDg4LjY0MmwwLDIyNS4wOTZsMTM4LjgyNSwtMjIuNjk5bDAsLTExNS43M2wtMTM4LjgyNSwtODYuNjY3WiIgc3R5bGU9ImZpbGw6IzhmYjNjZjtmaWxsLXJ1bGU6bm9uemVybzsiLz48cGF0aCBkPSJNMTkzOS4yMjQsNjg5LjQyNmwxMjguNTk2LC0yMS40NThsLTEyOC4xODIsLTg0LjYzM2wtMC40MTQsMTA2LjA5MVoiIHN0eWxlPSJmaWxsOiM4ZmIzY2Y7ZmlsbC1ydWxlOm5vbnplcm87Ii8+PHBhdGggZD0iTTE3ODguNjU2LDcyOC41MzlsMTM4LjgyNSwtMjIuNWwwLDE1NS45MzdsLTEzOC44MjUsMjEuMTQ3IiBzdHlsZT0iZmlsbDojOGZiM2NmO2ZpbGwtcnVsZTpub256ZXJvOyIvPjxwYXRoIGQ9Ik0xOTM5LjIyNCw3MDQuMzcybDEyOC41OTYsLTIxLjI1bDAsMTU4LjA3bC0xMjguNTk2LDE5LjAxNGwwLC0xNTUuODMzWiIgc3R5bGU9ImZpbGw6IzhmYjNjZjtmaWxsLXJ1bGU6bm9uemVybzsiLz48cGF0aCBkPSJNMTc4OC42NTYsODk4LjA1M2wwLDEyNi4yNzVsMTM4LjgyNSwtMjMuOTIxbDAsLTEyMy41MjlsLTEzOC44MjUsMjEuMTc1WiIgc3R5bGU9ImZpbGw6IzhmYjNjZjtmaWxsLXJ1bGU6bm9uemVybzsiLz48cGF0aCBkPSJNMTkzOS4yMjQsODc1LjAxNWwwLjgwNCwxMjMuNDMxbDEyNi4yNzUsLTIwLjc4M2wxLjUxNywtMTIxLjYyNGwtMTI4LjU5NiwxOC45NzZaIiBzdHlsZT0iZmlsbDojOGZiM2NmO2ZpbGwtcnVsZTpub256ZXJvOyIvPjxwYXRoIGQ9Ik0yOTUuNzE4LDc2Ny44NTdsMCw5MC45NzlsODAuMzkyLDM0LjExN2wwLC05Mi41NDZsLTgwLjM5MiwtMzIuNTVaIiBzdHlsZT0iZmlsbDojOGZiM2NmO2ZpbGwtcnVsZTpub256ZXJvOyIvPjxwYXRoIGQ9Ik0zODcuNSw4MDQuNzg5bC0wLjAwNyw5My4wMTFsNzcuNjM1LDMzLjA1NWwwLC05Mi44MDRsLTc3LjYyOCwtMzMuMjYzWiIgc3R5bGU9ImZpbGw6IzhmYjNjZjtmaWxsLXJ1bGU6bm9uemVybzsiLz48L2c+PGcgaWQ9InNvbGFyIj48cGF0aCBkPSJNMTAxNS4yMzEsMTAyLjM2OGwtOTUuNzE3LDgxLjY1bDEwOC4yNjcsNDAuNzA0bDk3LjUyMSwtODIuODk2bC0xMTAuMDcxLC0zOS40NThaIiBzdHlsZT0iZmlsbDojMzM1NTdmO2ZpbGwtcnVsZTpub256ZXJvOyIvPjxwYXRoIGQ9Ik05MTUuNzA0LDE4Ny41OGwtOTcuNDIxLDgzLjEwNGwxMDguMjY3LDQwLjcwNGw5Ny41MjEsLTgyLjg5NmwtMTA4LjM2NywtNDAuOTEyWiIgc3R5bGU9ImZpbGw6IzMzNTU3ZjtmaWxsLXJ1bGU6bm9uemVybzsiLz48cGF0aCBkPSJNODEyLjgxLDI3NC4wNTFsLTk3LjQyMSw4My4xMDRsMTA4LjI2Nyw0MC43MDRsOTcuNTIxLC04Mi44OTZsLTEwOC4zNjcsLTQwLjkxM1oiIHN0eWxlPSJmaWxsOiMzMzU1N2Y7ZmlsbC1ydWxlOm5vbnplcm87Ii8+PHBhdGggZD0iTTExMzAuNTI1LDE0NS4zMWwtOTUuNzE3LDgxLjY1bDEwOC4yNjcsNDAuNzA0bDk3LjUyMSwtODIuODk2bC0xMTAuMDcxLC0zOS40NThaIiBzdHlsZT0iZmlsbDojMzM1NTdmO2ZpbGwtcnVsZTpub256ZXJvOyIvPjxwYXRoIGQ9Ik0xMDMwLjk5OCwyMzAuNTIxbC05Ny40MjEsODMuMTA0bDEwOC4yNjcsNDAuNzA0bDk3LjUyMSwtODIuODk2bC0xMDguMzY3LC00MC45MTJaIiBzdHlsZT0iZmlsbDojMzM1NTdmO2ZpbGwtcnVsZTpub256ZXJvOyIvPjxwYXRoIGQ9Ik05MjguMTA0LDMxNi45OTJsLTk3LjQyMSw4My4xMDRsMTA4LjI2Nyw0MC43MDRsOTcuNTIxLC04Mi44OTZsLTEwOC4zNjcsLTQwLjkxMloiIHN0eWxlPSJmaWxsOiMzMzU1N2Y7ZmlsbC1ydWxlOm5vbnplcm87Ii8+PHBhdGggZD0iTTEyNDYuNDA3LDE4OC4yMWwtOTUuNzE3LDgxLjY1bDEwOC4yNjcsNDAuNzA0bDk3LjUyMSwtODIuODk2bC0xMTAuMDcxLC0zOS40NThaIiBzdHlsZT0iZmlsbDojMzM1NTdmO2ZpbGwtcnVsZTpub256ZXJvOyIvPjxwYXRoIGQ9Ik0xMTQ2Ljg4LDI3My40MjJsLTk3LjQyMSw4My4xMDRsMTA4LjI2Nyw0MC43MDRsOTcuNTIxLC04Mi44OTZsLTEwOC4zNjcsLTQwLjkxM1oiIHN0eWxlPSJmaWxsOiMzMzU1N2Y7ZmlsbC1ydWxlOm5vbnplcm87Ii8+PHBhdGggZD0iTTEwNDMuOTg2LDM1OS44OTJsLTk3LjQyMSw4My4xMDRsMTA4LjI2Nyw0MC43MDRsOTcuNTIxLC04Mi44OTZsLTEwOC4zNjcsLTQwLjkxMloiIHN0eWxlPSJmaWxsOiMzMzU1N2Y7ZmlsbC1ydWxlOm5vbnplcm87Ii8+PHBhdGggZD0iTTEzNjEuNywyMzEuMTUxbC05NS43MTcsODEuNjVsMTA4LjI2Nyw0MC43MDRsOTcuNTIxLC04Mi44OTZsLTExMC4wNzEsLTM5LjQ1OFoiIHN0eWxlPSJmaWxsOiMzMzU1N2Y7ZmlsbC1ydWxlOm5vbnplcm87Ii8+PHBhdGggZD0iTTEyNjIuMTc0LDMxNi4zNjNsLTk3LjQyMSw4My4xMDRsMTA4LjI2Nyw0MC43MDRsOTcuNTIxLC04Mi44OTZsLTEwOC4zNjcsLTQwLjkxMloiIHN0eWxlPSJmaWxsOiMzMzU1N2Y7ZmlsbC1ydWxlOm5vbnplcm87Ii8+PHBhdGggZD0iTTExNTkuMjgsNDAyLjgzM2wtOTcuNDIxLDgzLjEwNGwxMDguMjY3LDQwLjcwNGw5Ny41MjEsLTgyLjg5NmwtMTA4LjM2NywtNDAuOTEyWiIgc3R5bGU9ImZpbGw6IzMzNTU3ZjtmaWxsLXJ1bGU6bm9uemVybzsiLz48cGF0aCBkPSJNMTQ3NS45ODQsMjc0LjA1MWwtOTUuNzE3LDgxLjY1bDEwOC4yNjcsNDAuNzA0bDk3LjUyMSwtODIuODk2bC0xMTAuMDcxLC0zOS40NThaIiBzdHlsZT0iZmlsbDojMzM1NTdmO2ZpbGwtcnVsZTpub256ZXJvOyIvPjxwYXRoIGQ9Ik0xMzc2LjQ1NywzNTkuMjYzbC05Ny40MjEsODMuMTA0bDEwOC4yNjcsNDAuNzA0bDk3LjUyMSwtODIuODk2bC0xMDguMzY3LC00MC45MTJaIiBzdHlsZT0iZmlsbDojMzM1NTdmO2ZpbGwtcnVsZTpub256ZXJvOyIvPjxwYXRoIGQ9Ik0xMjczLjU2Myw0NDUuNzMzbC05Ny40MjEsODMuMTA0bDEwOC4yNjcsNDAuNzA0bDk3LjUyMSwtODIuODk2bC0xMDguMzY3LC00MC45MTJaIiBzdHlsZT0iZmlsbDojMzM1NTdmO2ZpbGwtcnVsZTpub256ZXJvOyIvPjwvZz48ZyBpZD0icG93ZXJsaW5lLXNvbGFyIiBzZXJpZjppZD0icG93ZXJsaW5lIHNvbGFyIj48cGF0aCBkPSJNMTU3Ni44OTEsODU4LjA1M2wwLjM2NywtMTYxLjU2N2MwLjgzOCwtMjMuMzEyIC0wLjcsLTU1LjM4MyAtMTAuOTYyLC05MS42ODNjLTE2Ljc5MiwtNTkuMzk2IC00OS4xNzUsLTg3LjA2MiAtNjguNjIxLC0xMDguMzE3Yy0xNi41NTQsLTE3LjYzMyAtNDMuMzQ2LC0zOC42ODMgLTU5LjkwNCwtNTYuMzE3IiBzdHlsZT0iZmlsbDpub25lO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTojN2Y3ZjdmO3N0cm9rZS13aWR0aDoyMC44M3B4OyIvPjwvZz48ZyBpZD0icG93ZXJsaW5lLWJhdHRlcnkiIHNlcmlmOmlkPSJwb3dlcmxpbmUgYmF0dGVyeSI+PHBhdGggZD0iTTE1NDkuMzEsOTMyLjgzNWwtOTcuNzU0LDE3LjYxNyIgc3R5bGU9ImZpbGw6bm9uZTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6IzdmN2Y3ZjtzdHJva2Utd2lkdGg6MjAuODNweDsiLz48L2c+PGcgaWQ9InBvd2VybGluZS1ncmlkIiBzZXJpZjppZD0icG93ZXJsaW5lIGdyaWQiPjxwYXRoIGQ9Ik0xNTcwLjYxNiw5OTQuMzI5bDEyLjU1LDBsLTEyLjU1LDBaIiBzdHlsZT0iZmlsbDojZmZmO2ZpbGwtcnVsZTpub256ZXJvOyIvPjxwYXRoIGQ9Ik0xNTgzLjE2Niw5OTQuMzI3bC0xMi41NSwwIiBzdHlsZT0iZmlsbDpub25lO2ZpbGwtcnVsZTpub256ZXJvO3N0cm9rZTojMDAwO3N0cm9rZS13aWR0aDo0LjE3cHg7Ii8+PHBhdGggZD0iTTE1NzcuNTg3LDk5NC4zMjdjMCwwIDEuODI1LDc3LjcyNSAtMC42OTYsMTE1Ljg4M2MtMS44NzUsMjguMzU4IDI2LjYzOCwzOC41NTQgMzguMzQyLDQ4LjM1YzI3LjQ1NCwyMi45NjcgMTczLjQyMSw3OS4xIDE3My40MjEsNzkuMWMwLDAgNjAuMzk2LDIzLjUyOSAxOS42MDgsMzIuOTQyYy00MC43ODMsOS40MTIgLTE0MjAuNzc5LDI2MS45NTggLTE0MjAuNzc5LDI2MS45NTgiIHN0eWxlPSJmaWxsOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOiM3ZjdmN2Y7c3Ryb2tlLXdpZHRoOjIwLjgzcHg7Ii8+PC9nPjxnIGlkPSJwb3dlcmxpbmUtb3V0c2lkZSIgc2VyaWY6aWQ9InBvd2VybGluZSBvdXRzaWRlIj48cGF0aCBkPSJNMTYwMS4yMTYsOTI0Ljc4bDc0LjUsLTEzLjM5MmMwLDAgMjEuMTc1LDMuOTIxIDIyLjM1LDMwLjE5NmMxLjE3OSwyNi4yNzEgNi4xMDQsMTc1LjgxNyA2LjEwNCwxNzUuODE3YzAsMCA5LjE5MiwxNi4zMzcgMjMuMzA4LDIyLjIyMWM4LjI4NywzLjQ1NCA4NC4zLDM2LjEwNCAxNDUuNjU0LDYyLjQ3OWMyNC41LDEwLjUyOSA0Ni42NjcsMjAuMDYyIDYxLjI0NiwyNi4zMzNjMTEuNjQyLDUuMDA0IDI0LjQ1NCw2LjUzMyAzNi45NSw0LjQyMWwzNzAuMzM4LC02Mi42NDYiIHN0eWxlPSJmaWxsOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOiM3ZjdmN2Y7c3Ryb2tlLXdpZHRoOjIwLjgzcHg7Ii8+PC9nPjxnIGlkPSJwb3dlcmxpbmUtaG91c2UiIHNlcmlmOmlkPSJwb3dlcmxpbmUgaG91c2UiPjxwYXRoIGQ9Ik0xMzQ4LjY1Nyw5NzAuMjFsLTEyNS44ODMsMjguMjMzbC0xNDcuMDU4LC01MS4wMzNsLTY5LjUzMywzLjE5MiIgc3R5bGU9ImZpbGw6bm9uZTtmaWxsLXJ1bGU6bm9uemVybztzdHJva2U6IzdmN2Y3ZjtzdHJva2Utd2lkdGg6MjAuODNweDsiLz48L2c+PGcgaWQ9ImludmVydGVyIj48cGF0aCBkPSJNMTU5MS40MjYsOTk0LjMyN2wtMjcuNjc5LDBjLTEzLjE0NiwwIC0yMy44MDgsLTEwLjY1OCAtMjMuODA4LC0yMy44MDhsMCwtODYuNWMwLC0xMy4xNSAxMC42NjIsLTIzLjgwOCAyMy44MDgsLTIzLjgwOGwyNy42NzksMGMxMy4xNSwwIDIzLjgwOCwxMC42NTggMjMuODA4LDIzLjgwOGwwLDg2LjVjMCwxMy4xNSAtMTAuNjU4LDIzLjgwOCAtMjMuODA4LDIzLjgwOCIgc3R5bGU9ImZpbGw6IzMxMzgzZTtmaWxsLXJ1bGU6bm9uemVybzsiLz48L2c+PGcgaWQ9ImNhciI+PHBhdGggZD0iTTYwNi42Miw5MzAuODU1bDAuODYyLDI0MS43MDhsMTM4LjgyMSwtMzIuOTQyYzAsMCA1Mi43NjcsLTQ0Ljc2MyA1NC45MDQsLTY0LjcwOGMyLjEzOCwtMTkuOTQyIDAuMjQyLC0yMS41NDIgLTUuNDkyLC0yNS40ODdjLTUuNzMzLC0zLjk1IC02LjgyNSwtMTMuOTc1IC00Ni4yNzUsLTE2LjA3OWMtMzkuNDUsLTIuMTA0IC04Ny4wNTgsLTQ1Ljg5NiAtODcuMDU4LC00NS44OTZsLTU1Ljc2MywtNTYuNTk2WiIgc3R5bGU9ImZpbGw6IzdjMjQxYjtmaWxsLXJ1bGU6bm9uemVybzsiLz48cGF0aCBkPSJNNjUyLjk3MiwxMDQ4LjI0OWMwLDAgLTM2LjA3OSwyMS45NjMgLTIwLDYzLjkyMWMxNi4wNzksNDEuOTYzIDUxLjc2NywzOC4wNDIgNTEuNzY3LDM4LjA0MmMwLDAgMjkuNDA4LC02LjI3NSAyOS40MDgsLTE2LjQ3MWwwLC01LjFsLTIwLDBjMCwwIDIuNzQ2LC0yMC43ODMgLTAuMzkyLC0zNC41MDhjLTMuMTM3LC0xMy43MjUgLTUuODgzLC0yOS44MDQgLTE0LjExNywtMzYuNDcxYy04LjIzMywtNi42NjcgLTEzLjMzMywtMTMuMzMzIC0yNi42NjcsLTkuNDEzIiBzdHlsZT0iZmlsbDojYzMzYjJjO2ZpbGwtcnVsZTpub256ZXJvOyIvPjxwYXRoIGQ9Ik02MDUuNzE1LDg2My41ODhjMCwwIDUwLjM5NiwtMTYuNTE3IDg4LjgyNSwtMTcuM2MzOC40MzMsLTAuNzgzIDY1Ljg4MywxNC4xMTcgNzcuNjQ2LDI1Ljg4M2MxMS43NjcsMTEuNzYyIDUzLjMzMyw2NC4zMTIgODIuMzU0LDgwLjc4M2MyOS4wMjEsMTYuNDcxIDgxLjU2NywzNS4yOTYgODMuMTM3LDk2LjQ3MWMxLjU2Nyw2MS4xNzUgLTU2LjQ3MSw1OC4wMzcgLTU2LjQ3MSw1OC4wMzdsLTEzNC45LDMyLjE1OGMwLDAgNDkuNDA4LC00Mi4zNTQgNTEuNzYzLC03MS4zNzFjMi4zNTQsLTI5LjAyMSAtNDYuMjc1LC0yNy40NTQgLTQ2LjI3NSwtMjcuNDU0YzAsMCAtMjMuNTI5LC0xLjU2NyAtNTYuNDcxLC0xOS42MDhjLTMyLjk0MiwtMTguMDM4IC04OC43MDQsLTkwLjMzMyAtODguNzA0LC05MC4zMzNsLTAuOTA0LC02Ny4yNjdaIiBzdHlsZT0iZmlsbDojYzMzYjJjO2ZpbGwtcnVsZTpub256ZXJvOyIvPjwvZz48ZyBpZD0iYmF0dGVyeSI+PHBhdGggZD0iTTEzOTIuNTc4LDgzNS4zMDhsNTguMjMzLC01LjQ5MmMwLDAgNS40OTIsLTEuMzcxIDYuMDc5LDUuNDkyYzAuOTQyLDEwLjk2NyAwLjAxMywyMDcuMDU4IDAuMDEzLDIwNy4wNThjMCwwIC0yLjM2Miw2LjI3NSAtOS40MjUsNy44NDJjLTcuMDU4LDEuNTcxIC0xMDcuNDUsMTQuOTA0IC0xMDcuNDUsMTQuOTA0YzAsMCAtMTAuOTc5LC0xLjU3MSAtMTEuNzYzLC0xMi41NWMtMC43ODMsLTEwLjk3OSAwLC0yMDIuMzU0IDAsLTIwMi4zNTRjMCwwIC0wLjY1LC02LjgwNCA3Ljk3OSwtOS4xNThjOC42MjUsLTIuMzU0IDU2LjMzMywtNS43NDIgNTYuMzMzLC01Ljc0MiIgc3R5bGU9ImZpbGw6IzJiMzAzNztmaWxsLXJ1bGU6bm9uemVybzsiLz48cGF0aCBkPSJNMTQwMS4yMDUsOTAxLjE5bC0yNS44ODMsNTAuOTc5bDE3LjE1NCwwbDAsMjkuODA0bDI0LjQxNywtNDQuNzA0bC0xNC45MDQsNC4zMTJsLTAuNzgzLC00MC4zOTJaIiBzdHlsZT0iZmlsbDojM2RkYzg0O2ZpbGwtcnVsZTpub256ZXJvOyIvPjwvZz48L2c+PC9zdmc+",
      fg: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMjM3NSAxNTg0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHN0eWxlPSJmaWxsLXJ1bGU6ZXZlbm9kZDtjbGlwLXJ1bGU6ZXZlbm9kZDsiPjxnIGlkPSJpbnZlcnRlciI+PHBhdGggZD0iTTE1OTEuNDI2LDk5NC4zMjdsLTI3LjY3OSwwYy0xMy4xNDYsMCAtMjMuODA4LC0xMC42NTggLTIzLjgwOCwtMjMuODA4bDAsLTg2LjVjMCwtMTMuMTUgMTAuNjYyLC0yMy44MDggMjMuODA4LC0yMy44MDhsMjcuNjc5LDBjMTMuMTUsMCAyMy44MDgsMTAuNjU4IDIzLjgwOCwyMy44MDhsMCw4Ni41YzAsMTMuMTUgLTEwLjY1OCwyMy44MDggLTIzLjgwOCwyMy44MDgiIHN0eWxlPSJmaWxsOiMzMTM4M2U7ZmlsbC1ydWxlOm5vbnplcm87Ii8+PC9nPjxnIGlkPSJiYXR0ZXJ5Ij48cGF0aCBkPSJNMTM5Mi41NzgsODM1LjMwOGw1OC4yMzMsLTUuNDkyYzAsMCA1LjQ5MiwtMS4zNzEgNi4wNzksNS40OTJjMC45NDIsMTAuOTY3IDAuMDEzLDIwNy4wNTggMC4wMTMsMjA3LjA1OGMwLDAgLTIuMzYyLDYuMjc1IC05LjQyNSw3Ljg0MmMtNy4wNTgsMS41NzEgLTEwNy40NSwxNC45MDQgLTEwNy40NSwxNC45MDRjMCwwIC0xMC45NzksLTEuNTcxIC0xMS43NjMsLTEyLjU1Yy0wLjc4MywtMTAuOTc5IDAsLTIwMi4zNTQgMCwtMjAyLjM1NGMwLDAgLTAuNjUsLTYuODA0IDcuOTc5LC05LjE1OGM4LjYyNSwtMi4zNTQgNTYuMzMzLC01Ljc0MiA1Ni4zMzMsLTUuNzQyIiBzdHlsZT0iZmlsbDojMmIzMDM3O2ZpbGwtcnVsZTpub256ZXJvOyIvPjxwYXRoIGQ9Ik0xNDAxLjIwNSw5MDEuMTlsLTI1Ljg4Myw1MC45NzlsMTcuMTU0LDBsMCwyOS44MDRsMjQuNDE3LC00NC43MDRsLTE0LjkwNCw0LjMxMmwtMC43ODMsLTQwLjM5MloiIHN0eWxlPSJmaWxsOiMzZGRjODQ7ZmlsbC1ydWxlOm5vbnplcm87Ii8+PC9nPjwvc3ZnPg==",
    };

    this.lineConfig = [
      {
        id: "solar",
        type: "solar",
        entity_key: "solar_power",
        reverse: true,
        container: "solar",
      },
      {
        id: "battery",
        type: "bat-charge",
        entity_key: "battery_charge_power",
        reverse: false,
        container: "battery",
        pathKey: "battery",
      },
      {
        id: "ev",
        type: "ev",
        entity_key: "ev_charge_power",
        reverse: false,
        container: "ev",
      },
      {
        id: "grid-import",
        type: "grid-import",
        entity_key: "grid_import_power",
        reverse: true,
        container: "primary",
        pathKey: "primary",
      },
      {
        id: "grid-export",
        type: "grid-export",
        entity_key: "grid_export_power",
        reverse: false,
        container: "out",
        pathKey: "out",
      },

      {
        id: "bg",
        type: "bg",
        pathKey: "bg",
        isBackground: true,
        container: "bg",
      },

      {
        // Foreground redraw of the battery + inverter so animated wires tuck
        // behind them instead of painting over the devices.
        id: "fg",
        type: "fg",
        pathKey: "fg",
        isBackground: true,
        container: "fg",
      },
    ];

    this.isInitialized = false;

    // Descriptor value is produced by a Jinja2 template rendered by HA.
    this.descriptorTypes = ["solar", "grid", "battery", "ev", "home"];
    this._templateResults = {};   // type -> last rendered string
    this._unsubTemplates = {};     // type -> Promise<unsubscribe>
    this._subscribedTemplates = {}; // type -> template string currently subscribed

    // align: "left" (default) draws the line then text to its right;
    // "right" draws the text to the left of the line, right-justified.
    this.descriptorAnchors = {
      solar: { textX: 380, valueY: 40, labelY: 82, align: "right", hideLine: true },
      grid: { textX: 1050, valueY: 720, labelY: 762, align: "right", hideLine: true },
      battery: { lineX: 672, lineY1: 100, lineY2: 400, textX: 626, valueY: 40, labelY: 82 },
      // EV sits under the car in the garage. No connector line.
      ev: { textX: 330, valueY: 600, labelY: 642, hideLine: true },
      home: { textX: 1050, valueY: 40, labelY: 82, align: "right", hideLine: true },
    };
  }

  firstUpdated() {
    this.lineContainers = {
      bg: this.shadowRoot.getElementById("svg-container-bg"),
      solar: this.shadowRoot.getElementById("svg-container-solar"),
      battery: this.shadowRoot.getElementById("svg-container-battery"),
      ev: this.shadowRoot.getElementById("svg-container-ev"),
      primary: this.shadowRoot.getElementById("svg-container-primary"),
      out: this.shadowRoot.getElementById("svg-container-out"),
      fg: this.shadowRoot.getElementById("svg-container-fg"),
    };
    this.loadAllSVGs();
    this.isInitialized = true;
  }

  set hass(hass) {
    const oldHass = this._hass;
    this._hass = hass;
    this.requestUpdate("hass", oldHass);
    if (this.isInitialized) {
      this.updateFlow();
    }
    this._subscribeTemplates();
  }

  get hass() {
    return this._hass;
  }

  connectedCallback() {
    super.connectedCallback();
    // Re-establish template subscriptions after the element is re-attached.
    this._subscribeTemplates();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._unsubscribeTemplates();
  }

  // Subscribe each enabled descriptor's Jinja2 template to HA's render_template
  // websocket API. Re-subscribes only when the template string actually changes.
  _subscribeTemplates() {
    if (!this._hass || !this._hass.connection) return;

    this.descriptorTypes.forEach((type) => {
      const enabled = this.config && this.config[`${type}_descriptor_enabled`];
      const template = this.config && this.config[`${type}_descriptor_template`];

      // Tear down if disabled or template removed.
      if (!enabled || !template) {
        if (this._subscribedTemplates[type] !== undefined) {
          this._unsubscribeTemplate(type);
          delete this._templateResults[type];
          this.requestUpdate();
        }
        return;
      }

      // Already subscribed to this exact template.
      if (this._subscribedTemplates[type] === template) return;

      // Template changed: drop the old subscription first.
      this._unsubscribeTemplate(type);
      this._subscribedTemplates[type] = template;

      this._unsubTemplates[type] = this._hass.connection
        .subscribeMessage(
          (msg) => {
            this._templateResults[type] =
              msg.error !== undefined ? `⚠ ${msg.error}` : msg.result;
            this.requestUpdate();
          },
          { type: "render_template", template }
        )
        .catch((err) => {
          this._templateResults[type] = "⚠ template error";
          this.requestUpdate();
          // eslint-disable-next-line no-console
          console.error(`Failed to render ${type} descriptor template:`, err);
        });
    });
  }

  _unsubscribeTemplate(type) {
    const pending = this._unsubTemplates[type];
    if (pending) {
      Promise.resolve(pending)
        .then((unsub) => {
          if (typeof unsub === "function") unsub();
        })
        .catch(() => {});
    }
    delete this._unsubTemplates[type];
    delete this._subscribedTemplates[type];
  }

  _unsubscribeTemplates() {
    this.descriptorTypes.forEach((type) => this._unsubscribeTemplate(type));
  }

  ensureGlow(svgEl) {
    if (!svgEl.querySelector("#glow")) {
      const defs = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "defs"
      );
      defs.innerHTML = `
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2.5" result="blur"/>
                    <feMerge>
                        <feMergeNode in="blur"/>
                        <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                </filter>`;
      svgEl.insertBefore(defs, svgEl.firstChild);
    }
  }

  // Respect the container's inner padding: scale every SVG layer to the
  // padded box and center it, so artwork and descriptors stay aligned.
  _fitSvgToPadding(svgEl) {
    svgEl.style.width = "calc(100% - 2 * var(--pfc-inner-padding, 0px))";
    svgEl.style.height = "calc(100% - 2 * var(--pfc-inner-padding, 0px))";
  }

  processSVGString(text, containerEl, lineType) {
    containerEl.innerHTML = text;
    const svgEl = containerEl.querySelector("svg");
    if (!svgEl) return;

    this._fitSvgToPadding(svgEl);
    this.ensureGlow(svgEl);

    svgEl
      .querySelectorAll("path, circle, rect, line, polyline, polygon")
      .forEach((el) => {
        if (el.nodeName === "rect") {
          return;
        }
        // Start hidden: without a flow state a freshly-loaded line would show
        // up colored but motionless until the first updateFlow() runs.
        el.classList.add("anim-line", lineType, "flow-off");
        el.removeAttribute("stroke");
        el.style.removeProperty("stroke");

        // EcoFlow look: a thin static gray "wire" always sits underneath the
        // animated colored pulse. Cloned from the same geometry and inserted
        // before the animated element so it paints below it.
        const wire = el.cloneNode(true);
        wire.classList.remove("anim-line", lineType, "flow-off");
        wire.classList.add("wire-line", "wire-hidden");
        el.parentNode.insertBefore(wire, el);
      });
  }

  async loadSVG(path, containerEl, lineType, isBackground) {
    try {
      if (!path) throw new Error(`No SVG path provided for ${lineType}`);

      let text;

      if (path.startsWith('data:image/svg+xml;base64,')) {
        const base64Data = path.substring(path.indexOf(',') + 1);
        text = atob(base64Data);
      } else {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`SVG load failed: ${response.status} ${response.statusText}`);
        text = await response.text();
      }

      if (isBackground) {
        containerEl.innerHTML = text;
        const svgEl = containerEl.querySelector("svg");
        if (svgEl) this._fitSvgToPadding(svgEl);
      } else {
        this.processSVGString(text, containerEl, lineType);
      }
    } catch (err) {
      console.error(`Failed to load SVG for "${lineType}" from path "${path}":`, err);

      containerEl.innerHTML = `
                <p style="color:#f99; text-align:center; font-weight:bold;">
                    Error loading ${lineType} SVG
                </p>
            `;

      throw new Error(`SVG load failed for "${lineType}": ${err.message}`);
    }
  }

  async loadAllSVGs() {
    const loads = this.lineConfig.map((cfg) => {
      const pathKey = cfg.pathKey || cfg.type;
      const path = this.svgPaths[pathKey];

      const containerId = cfg.container || cfg.id;
      const container = this.lineContainers[containerId];

      if (path && container) {
        return this.loadSVG(path, container, cfg.type, cfg.isBackground).catch(
          () => {}
        );
      }
      return Promise.resolve();
    });

    await Promise.all(loads);

    // SVGs are only now in the DOM, so apply the current flow state to them.
    if (this._hass) {
      this.updateFlow();
    }
  }

  updateFlow() {
    const threshold = (this.config && this.config.threshold != null)
      ? (Number(this.config.threshold) || 10)
      : 10;
    this.lineConfig
      .filter((c) => c.entity_key)
      .forEach((cfg) => {
        const container = this.lineContainers[cfg.container || cfg.id];

        if (!container) return;

        let value = 0;
        let reverse = !!cfg.reverse;
        let configured = false;

        if (cfg.type === "bat-charge") {
          const chargeEntity = this.config.entities["battery_charge_power"];
          const dischargeEntity = this.config.entities["battery_discharge_power"];
          configured = !!(chargeEntity || dischargeEntity);

          const chargeState = chargeEntity ? this._hass.states[chargeEntity] : null;
          const dischargeState = dischargeEntity ? this._hass.states[dischargeEntity] : null;

          const chargeValue = chargeState ? parseFloat(chargeState.state) : 0;
          const dischargeValue = dischargeState ? parseFloat(dischargeState.state) : 0;

          if (chargeValue > 0) {
            value = chargeValue;
            reverse = false; // normal direction
          } else if (dischargeValue > 0) {
            value = dischargeValue;
            reverse = true; // reverse direction
          } else {
            value = 0;
          }
        } else {

          const entityId = this.config.entities[cfg.entity_key];
          configured = !!entityId;
          const stateObj = entityId ? this._hass.states[entityId] : null;
          value = stateObj ? parseFloat(stateObj.state) : 0;
        }

        const lines = container.querySelectorAll(".anim-line");
        const isActive = Math.abs(value) > threshold;

        // Static gray wire is shown whenever the device is configured, so the
        // routing is always visible (EcoFlow style) even at 0 W.
        container.querySelectorAll(".wire-line").forEach((wire) => {
          if (wire.classList.contains("wire-hidden") === configured) {
            wire.classList.toggle("wire-hidden", !configured);
          }
        });

        let animationDuration = 3; // default speed
        
        // Speed Control by Setting min speed and max Power thresholds as well as min and max flow speed
        if (this.config.dynamic_speed_enabled !== false) {
          // Higher power = faster animation (shorter duration)
          const minSpeed = this.config.min_flow_speed || 5; 
          const maxSpeed = this.config.max_flow_speed || 1; 
          const minPower = this.config.min_power_threshold || 100; 
          const maxPower = this.config.max_power_threshold || 10000;
          
          const clampedPower = Math.max(minPower, Math.min(maxPower, Math.abs(value)));
          const speedRatio = (clampedPower - minPower) / (maxPower - minPower);
          animationDuration = minSpeed - (speedRatio * (minSpeed - maxSpeed));
        }

        // Round the duration so tiny power fluctuations don't rewrite the
        // custom property every tick (which restarts the animation = flicker).
        const durationStr = `${animationDuration.toFixed(2)}s`;

        lines.forEach((line) => {
          // Only write to the DOM when the class isn't already in the desired
          // state. Re-applying the same classes / --animation-duration on every
          // hass update restarts the running animation and causes flicker, but
          // we must still set the correct class on first render (a fresh line
          // has neither flow-active nor flow-off).
          if (line.classList.contains("flow-active") !== isActive) {
            line.classList.toggle("flow-active", isActive);
          }
          if (line.classList.contains("flow-off") !== !isActive) {
            line.classList.toggle("flow-off", !isActive);
          }
          if (line.classList.contains("reverse-flow") !== reverse) {
            line.classList.toggle("reverse-flow", reverse);
          }
          if (isActive && line.dataset.animDuration !== durationStr) {
            line.style.setProperty("--animation-duration", durationStr);
            line.dataset.animDuration = durationStr;
          }
        });
      });
  }

  setConfig(config) {
    if (!config.entities || Object.keys(config.entities).length === 0) {
      throw new Error(
        "You need to define entities for the power flow diagram."
      );
    }
    this.config = config;
    // Config (and thus descriptor templates) may have changed.
    this._subscribeTemplates();
  }

  static getConfigForm() {
    return {
      schema: [
        { name: "name", selector: { text: {} } },
        { name: "threshold", type: "float" },
        {
          type: "expandable",
          name: "",
          title: "Animation Speed Settings",
          schema: [
            { name: "dynamic_speed_enabled", selector: { boolean: {} } },
            { name: "min_flow_speed", type: "float", default: 5 },
            { name: "max_flow_speed", type: "float", default: 1 },
            { name: "min_power_threshold", type: "float", default: 100 },
            { name: "max_power_threshold", type: "float", default: 10000 },
          ],
        },
        {
          type: "expandable",
          name: "",
          title: "Line Colors (Optional)",
          schema: [
            { name: "solar_line_color", selector: { text: {} } },
            { name: "grid_import_line_color", selector: { text: {} } },
            { name: "grid_export_line_color", selector: { text: {} } },
            { name: "battery_charge_line_color", selector: { text: {} } },
            { name: "battery_discharge_line_color", selector: { text: {} } },
            { name: "ev_line_color", selector: { text: {} } },
          ],
        },
        {
          type: "grid",
          name: "entities",
          flatten: false,
          schema: [
            { name: "solar_power", selector: { entity: {} } },
            { name: "grid_import_power", selector: { entity: {} } },
            { name: "grid_export_power", selector: { entity: {} } },
            { name: "ev_charge_power", selector: { entity: {} } },
            { name: "battery_charge_power", selector: { entity: {} } },
            { name: "battery_discharge_power", selector: { entity: {} } },
          ],
        },
        {
          type: "expandable",
          name: "",
          title: "Solar Descriptor",
          schema: [
            { name: "solar_descriptor_enabled", selector: { boolean: {} } },
            { name: "solar_descriptor_label", selector: { text: {} } },
            { name: "solar_descriptor_template", selector: { template: {} } },
            { name: "solar_descriptor_entity", selector: { entity: {} } },
          ],
        },
        {
          type: "expandable",
          name: "",
          title: "Grid Descriptor",
          schema: [
            { name: "grid_descriptor_enabled", selector: { boolean: {} } },
            { name: "grid_descriptor_label", selector: { text: {} } },
            { name: "grid_descriptor_template", selector: { template: {} } },
            { name: "grid_descriptor_entity", selector: { entity: {} } },
          ],
        },
        {
          type: "expandable",
          name: "",
          title: "Battery Descriptor",
          schema: [
            { name: "battery_descriptor_enabled", selector: { boolean: {} } },
            { name: "battery_descriptor_label", selector: { text: {} } },
            { name: "battery_descriptor_template", selector: { template: {} } },
            { name: "battery_descriptor_entity", selector: { entity: {} } },
          ],
        },
        {
          type: "expandable",
          name: "",
          title: "EV Descriptor",
          schema: [
            { name: "ev_descriptor_enabled", selector: { boolean: {} } },
            { name: "ev_descriptor_label", selector: { text: {} } },
            { name: "ev_descriptor_template", selector: { template: {} } },
            { name: "ev_descriptor_entity", selector: { entity: {} } },
          ],
        },
        {
          type: "expandable",
          name: "",
          title: "Home Descriptor",
          schema: [
            { name: "home_descriptor_enabled", selector: { boolean: {} } },
            { name: "home_descriptor_label", selector: { text: {} } },
            { name: "home_descriptor_template", selector: { template: {} } },
            { name: "home_descriptor_entity", selector: { entity: {} } },
          ],
        },
      ],
      computeLabel: (schema) => {
        const map = {
          name: "Card title",
          threshold: "Active threshold (W)",
          "entities.solar_power": "Solar power entity",
          "entities.grid_import_power": "Grid import entity",
          "entities.grid_export_power": "Grid export entity",
          "entities.ev_charge_power": "EV charge entity",
          "entities.battery_charge_power": "Battery charge entity",
          "entities.battery_discharge_power": "Battery discharge entity",
          solar_power: "Solar power entity",
          grid_import_power: "Grid import entity",
          grid_export_power: "Grid export entity",
          ev_charge_power: "EV charge entity",
          battery_charge_power: "Battery charge entity",
          battery_discharge_power: "Battery discharge entity",
          dynamic_speed_enabled: "Enable dynamic speed based on power",
          min_flow_speed: "Slowest animation speed (seconds)",
          max_flow_speed: "Fastest animation speed (seconds)",
          min_power_threshold: "Power at slowest speed (Watts)",
          max_power_threshold: "Power at fastest speed (Watts)",
          solar_line_color: "Solar line color (hex/CSS color)",
          grid_import_line_color: "Grid import line color (hex/CSS color)",
          grid_export_line_color: "Grid export line color (hex/CSS color)",
          battery_charge_line_color: "Battery charge line color (hex/CSS color)",
          battery_discharge_line_color: "Battery discharge line color (hex/CSS color)",
          ev_line_color: "EV line color (hex/CSS color)",
          solar_descriptor_enabled: "Enable solar descriptor",
          solar_descriptor_label: "Label",
          solar_descriptor_template: "Value (Jinja2 template)",
          solar_descriptor_entity: "Entity to open on click (optional)",
          grid_descriptor_enabled: "Enable grid descriptor",
          grid_descriptor_label: "Label",
          grid_descriptor_template: "Value (Jinja2 template)",
          grid_descriptor_entity: "Entity to open on click (optional)",
          battery_descriptor_enabled: "Enable battery descriptor",
          battery_descriptor_label: "Label",
          battery_descriptor_template: "Value (Jinja2 template)",
          battery_descriptor_entity: "Entity to open on click (optional)",
          ev_descriptor_enabled: "Enable EV descriptor",
          ev_descriptor_label: "Label",
          ev_descriptor_template: "Value (Jinja2 template)",
          ev_descriptor_entity: "Entity to open on click (optional)",
          home_descriptor_enabled: "Enable home descriptor",
          home_descriptor_label: "Label",
          home_descriptor_template: "Value (Jinja2 template)",
          home_descriptor_entity: "Entity to open on click (optional)",
        };
        return map[schema.name];
      },
      assertConfig: (config) => {
        if (config && config.entities && typeof config.entities !== "object") {
          throw new Error("entities must be an object with entity ids");
        }
        if (config && config.threshold != null && Number.isNaN(Number(config.threshold))) {
          throw new Error("threshold must be a number (Watts)");
        }
      },
    };
  }

  getColorStyleVars() {
    const colorMap = [
      ["solar_line_color", "--pfc-solar-color"],
      ["grid_import_line_color", "--pfc-grid-import-color"],
      ["grid_export_line_color", "--pfc-grid-export-color"],
      ["battery_charge_line_color", "--pfc-battery-charge-color"],
      ["battery_discharge_line_color", "--pfc-battery-discharge-color"],
      ["ev_line_color", "--pfc-ev-color"],
    ];

    return colorMap
      .map(([configKey, cssVar]) => {
        const value = this.config?.[configKey];
        return value ? `${cssVar}: ${value};` : "";
      })
      .filter(Boolean)
      .join(" ");
  }

  static get styles() {
    return css`
      /* Card Container Setup */
      :host {
        display: block;
      }
      #svg-overlay {
        position: relative;
        width: 100%;
        height: 350px;
        container-type: size;
        pointer-events: none;
        box-sizing: border-box;
      }
      #svg-overlay > div:not(.descriptor) {
        position: absolute;
        inset: 0;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      /* Background Styling */
      #svg-container-bg svg {
        opacity: 0.5;
      }

      #descriptor-overlay {
        position: absolute;
        inset: 0;
        pointer-events: none;
      }

      .descriptor-line {
        stroke: var(--primary-text-color, #ffffff);
        stroke-width: 2;
        opacity: 0.5;
      }

      .descriptor-value {
        fill: var(--primary-text-color, #ffffff);
        font-family: var(--ha-font-family-body, var(--mdc-typography-font-family, Roboto, sans-serif));
        font-size: 32px;
        font-weight: bold;
      }

      .descriptor-label {
        fill: var(--secondary-text-color, #9aa0a6);
        font-family: var(--ha-font-family-body, var(--mdc-typography-font-family, Roboto, sans-serif));
        font-size: 26px;
        font-weight: 500;
      }

      /* Clickable descriptors opt back into pointer events (the overlay
         itself is pointer-events:none so non-clickable areas pass through). */
      .descriptor.clickable {
        cursor: pointer;
        pointer-events: all;
      }
      .descriptor.clickable:hover .descriptor-value,
      .descriptor.clickable:hover .descriptor-label {
        fill: var(--primary-color, #03a9f4);
      }

      /* Static gray "wire" underneath the animated pulse (EcoFlow style). */
      .wire-line {
        fill: none !important;
        stroke: var(--pfc-wire-color, #7f7f7f) !important;
        stroke-width: 4px;
        stroke-linecap: round;
        stroke-opacity: 0.55;
        filter: none !important;
        animation: none !important;
      }
      /* Wires only show for devices that are actually configured. */
      .wire-line.wire-hidden {
        opacity: 0;
      }

      /* Animated Line Styles */
      .anim-line {
        stroke-width: 6px;
        stroke-linecap: round;
        filter: url(#glow);
        stroke-dasharray: 100 2000;
        stroke-opacity: 1 !important;
        --animation-duration: 3s;
      }

      .flow-active .anim-line,
      .anim-line.flow-active {
        animation: flow-pulse var(--animation-duration) ease-in-out infinite !important;
      }

      .anim-line.reverse-flow {
        animation-direction: reverse !important;
      }

      /* Animation State Controls */
      .flow-active {
        animation-play-state: running !important;
        opacity: 1 !important;
      }
      .flow-off {
        animation-play-state: paused !important;
        opacity: 0 !important;
      }

      @keyframes flow-pulse {
        0% {
          stroke-dashoffset: 2100;
          stroke-opacity: 0.3;
          filter: drop-shadow(0 0 2px currentColor);
        }
        15% {
          stroke-opacity: 1;
          filter: drop-shadow(0 0 8px currentColor);
        }
        85% {
          stroke-opacity: 1;
          filter: drop-shadow(0 0 8px currentColor);
        }
        100% {
          stroke-dashoffset: 0;
          stroke-opacity: 0.3;
          filter: drop-shadow(0 0 2px currentColor);
        }
      }

      /* Color definitions (these apply classes to the SVG paths) */
      .solar {
        stroke: var(--pfc-solar-color, var(--energy-solar-color, gold)) !important;
      }
      
      .grid-import {
        stroke: var(--pfc-grid-import-color, var(--energy-grid-consumption-color, dodgerblue)) !important;
      }
      
      .grid-export {
        stroke: var(--pfc-grid-export-color, var(--energy-grid-return-color, limegreen)) !important;
      }
      
      .bat-charge {
        stroke: var(--pfc-battery-charge-color, var(--energy-battery-charge-color, cornflowerblue)) !important;
      }
      
      .bat-discharge {
         stroke: var(--pfc-battery-discharge-color, var(--energy-battery-discharge-color, deepskyblue)) !important;
      }

      .ev {
        stroke: var(--pfc-ev-color, var(--energy-car-color, deepskyblue)) !important;
      }
    `;
  }

  // Helper method to render a descriptor with label and value
  renderDescriptor(type) {
    const enabled = this.config[`${type}_descriptor_enabled`];
    const anchor = this.descriptorAnchors[type];
    if (!enabled || !anchor) return "";

    const label = this.config[`${type}_descriptor_label`] || "";

    // Value comes from the rendered Jinja2 template (see _subscribeTemplates).
    const rendered = this._templateResults[type];
    const value = rendered != null ? String(rendered).trim() : "";

    // Right-aligned descriptors sit the text to the left of the line.
    const textAnchor = anchor.align === "right" ? "end" : "start";

    // Optional entity: when set, the descriptor opens that entity's more-info
    // dialog on click.
    const entityId = this.config[`${type}_descriptor_entity`];
    const clickable = !!entityId;

    return svg`
      <g
        class="descriptor descriptor-${type} ${clickable ? "clickable" : ""}"
        transform=${anchor.transform || null}
        @click=${clickable ? () => this._openMoreInfo(entityId) : null}
      >
        ${anchor.hideLine ? "" : svg`<line class="descriptor-line" x1="${anchor.lineX}" y1="${anchor.lineY1}" x2="${anchor.lineX}" y2="${anchor.lineY2}"></line>`}
        ${value ? svg`<text class="descriptor-value" text-anchor="${textAnchor}" x="${anchor.textX}" y="${anchor.valueY}">${value}</text>` : ""}
        ${label ? svg`<text class="descriptor-label" text-anchor="${textAnchor}" x="${anchor.textX}" y="${anchor.labelY}">${label}</text>` : ""}
      </g>
    `;
  }

  // Fire HA's hass-more-info event to open the entity dialog.
  _openMoreInfo(entityId) {
    if (!entityId) return;
    const event = new CustomEvent("hass-more-info", {
      detail: { entityId },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  // 7. HTML Template (The card structure)
  render() {
    const colorStyle = this.getColorStyleVars();
    return html`
      <ha-card header="${this.config.name || "Power Flow Diagram"}" style="${colorStyle}; --pfc-inner-padding: 16px;">
        <div id="svg-overlay">
          <div id="svg-container-bg"></div>
          <div id="svg-container-solar"></div>
          <div id="svg-container-battery"></div>
          <div id="svg-container-ev"></div>
          <div id="svg-container-primary"></div>
          <div id="svg-container-out"></div>
          <div id="svg-container-fg"></div>
          <svg id="descriptor-overlay" viewBox="0 0 1139 756" preserveAspectRatio="xMidYMid meet"
               style="width: calc(100% - 2 * var(--pfc-inner-padding, 0px)); height: calc(100% - 2 * var(--pfc-inner-padding, 0px)); margin: auto;">
            ${this.renderDescriptor("solar")}
            ${this.renderDescriptor("grid")}
            ${this.renderDescriptor("battery")}
            ${this.renderDescriptor("ev")}
            ${this.renderDescriptor("home")}
          </svg>
        </div>
      </ha-card>
    `;
  }
}

customElements.define("power-flow-card", PowerFlowCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "power-flow-card",
  name: "Power Flow Card",
  preview: true,
  description: "Power Flow visualisation card for Home Assistant Lovelace",
});
