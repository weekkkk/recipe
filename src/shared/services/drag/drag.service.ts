import { EEventStage } from "../../enums";
import { IPosition } from "../../interfaces";
import { TEventStageListenerDictionary } from "../../types";
import { DragServiceEvent } from "./models";

export class DragService<T extends HTMLElement = HTMLElement> {
  private element: T;
  private position?: IPosition;
  private startPosition?: IPosition;
  private listeners: TEventStageListenerDictionary<DragServiceEvent>;

  constructor(
    element: T,
    listeners: TEventStageListenerDictionary<DragServiceEvent>
  ) {
    this.element = element;
    this.listeners = listeners;
  }

  init = () => {
    this.element.ondragstart = () => false;
    this.element.onpointerdown = this.onPointerdown;
    for (const [stage, listener] of Object.entries(this.listeners))
      this.element.addEventListener(
        `${stage}-drag-service-event`,
        listener as EventListener
      );
  };

  destroy = () => {
    this.element.ondragstart = null;
    this.element.onpointerdown = null;
    this.element.onpointermove = null;
    this.element.onpointerup = null;
    for (const [stage, listener] of Object.entries(this.listeners))
      this.element.removeEventListener(
        `${stage}-drag-and-drop`,
        listener as EventListener
      );
  };

  private onPointerdown = (event: PointerEvent) => {
    const { x, y } = event;
    this.startPosition = {
      x,
      y,
    };
    this.position = {
      x,
      y,
    };

    this.element.setPointerCapture(event.pointerId);
    this.element.onpointermove = this.onPointermove;
    this.element.onpointerup = this.onPointerup;
    this.generateEvent(EEventStage.Start);
  };

  private onPointermove = (event: PointerEvent) => {
    const { x, y } = event;
    this.position = {
      x,
      y,
    };
    this.generateEvent(EEventStage.Process);
  };

  private onPointerup = (event: PointerEvent) => {
    const { x, y } = event;
    this.position = {
      x,
      y,
    };
    this.generateEvent(EEventStage.Stop);
    this.startPosition = undefined;
    this.element.onpointermove = null;
    this.element.onpointerup = null;
  };

  private get deltaPosition(): IPosition | undefined {
    if (!this.startPosition || !this.position) return;
    const x = this.startPosition.x - this.position.x;
    const y = this.startPosition.y - this.position.y;
    return {
      x,
      y,
    };
  }

  private generateEvent(stage: EEventStage) {
    if (!this.startPosition || !this.position || !this.deltaPosition) return;
    const event = new DragServiceEvent(
      stage,
      this.startPosition,
      this.position,
      this.deltaPosition
    );
    this.element.dispatchEvent(event);
  }
}
