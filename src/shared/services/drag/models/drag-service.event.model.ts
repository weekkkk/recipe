import { EventStageEnum } from "@/shared/enums";
import { IPosition } from "@/shared/interfaces";

export class DragServiceEvent extends Event {
  readonly startPosition!: IPosition;
  readonly position!: IPosition;
  readonly deltaPosition!: IPosition;

  constructor(
    stage: EventStageEnum,
    startPosition: IPosition,
    position: IPosition,
    deltaPosition: IPosition,
    eventInitDict?: EventInit
  ) {
    super(`${stage}-drag-service-event`, eventInitDict);
    this.startPosition = startPosition;
    this.position = position;
    this.deltaPosition = deltaPosition;
  }
}
