import { playerContainer } from "../Player/player.css";

export function FullscreenContainer(props: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {props.children}
    </div>
  );
}

export function Container(props: { children: React.ReactNode }) {
  return <div className={playerContainer}>{props.children}</div>;
}

export function InteractiveInfoContainer(props: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      {props.children}
    </div>
  );
}
