import { ResizeBox } from "@/shared/components";
import { FC, useRef } from "react";

export const IngredientListPage: FC = () => {
  const el = useRef<HTMLDivElement>(null);

  return (
    <div>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur
      aperiam soluta autem voluptatem sit? Mollitia veritatis necessitatibus
      asperiores non ab animi dolore in voluptatibus, at quas, explicabo quia
      totam dolor! Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      Consequuntur aperiam soluta autem voluptatem sit? Mollitia veritatis
      necessitatibus asperiores non ab animi dolore in voluptatibus, at quas,
      explicabo quia totam dolor! Lorem ipsum, dolor sit amet consectetur
      adipisicing elit. Consequuntur aperiam soluta autem voluptatem sit?
      Mollitia veritatis necessitatibus asperiores non ab animi dolore in
      voluptatibus, at quas, explicabo quia totam dolor! Lorem ipsum, dolor sit
      amet consectetur adipisicing elit. Consequuntur aperiam soluta autem
      voluptatem sit? Mollitia veritatis necessitatibus asperiores non ab animi
      dolore in voluptatibus, at quas, explicabo quia totam dolor! Lorem ipsum,
      dolor sit amet consectetur adipisicing elit. Consequuntur aperiam soluta
      autem voluptatem sit? Mollitia veritatis necessitatibus asperiores non ab
      animi dolore in voluptatibus, at quas, explicabo quia totam dolor! Lorem
      ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur aperiam
      soluta autem voluptatem sit? Mollitia veritatis necessitatibus asperiores
      non ab animi dolore in voluptatibus, at quas, explicabo quia totam dolor!
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur
      aperiam soluta autem voluptatem sit? Mollitia veritatis necessitatibus
      asperiores non ab animi dolore in voluptatibus, at quas, explicabo quia
      totam dolor! Lorem ipsum, dolor sit amet consectetur adipisicing elit.
      Consequuntur aperiam soluta autem voluptatem sit? Mollitia veritatis
      necessitatibus asperiores non ab animi dolore in voluptatibus, at quas,
      explicabo quia totam dolor! Lorem ipsum, dolor sit amet consectetur
      adipisicing elit. Consequuntur aperiam soluta autem voluptatem sit?
      Mollitia veritatis necessitatibus asperiores non ab animi dolore in
      voluptatibus, at quas, explicabo quia totam dolor!
    </div>
    // <ResizeBox
    //   pointElements={{
    //     top: <button>top</button>,
    //     right: <button className="bg-green-500">right</button>,
    //     bottom: <button>bottom</button>,
    //     left: <button>left</button>,
    //   }}
    // >
    //   <div ref={el} className="bg-green-400 h-40 w-44 left-3 top-3">
    //     <h1>test</h1>
    //   </div>
    // </ResizeBox>
  );
};
