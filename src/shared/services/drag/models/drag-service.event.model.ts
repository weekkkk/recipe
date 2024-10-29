import { EEventStage } from "@/shared/enums";
import { IPosition } from "@/shared/interfaces";

export class DragServiceEvent extends Event {
  readonly stage!: EEventStage;
  readonly startPosition!: IPosition;
  readonly position!: IPosition;
  readonly deltaPosition!: IPosition;

  constructor(
    stage: EEventStage,
    startPosition: IPosition,
    position: IPosition,
    deltaPosition: IPosition,
    eventInitDict?: EventInit
  ) {
    super(`${stage}-drag-service-event`, eventInitDict);
    this.stage = stage;
    this.startPosition = startPosition;
    this.position = position;
    this.deltaPosition = deltaPosition;
  }
}
