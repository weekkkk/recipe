import { FC, useState } from "react";
import { HeaderLayout, PanelLayout } from "..";
import { DefaultLayoutTemplateSwitcher } from "./components";

export const Layout: FC<{ children: JSX.Element }> = ({ children }) => {
  const [xMenuVisible, setXMenuVisible] = useState(true);
  const [yMenuVisible, setYMenuVisible] = useState(true);

  return (
    <>
      <HeaderLayout
        rightChildren={
          <DefaultLayoutTemplateSwitcher
            x={xMenuVisible}
            setX={() => setXMenuVisible((prev) => !prev)}
            y={yMenuVisible}
            setY={() => setYMenuVisible((prev) => !prev)}
          />
        }
      />
      <main className="min-h-screen flex items-start bg-slate-500">
        <section className="relative grow self-stretch flex flex-col justify-between pt-20">
          {children}

          <PanelLayout
            visible={yMenuVisible}
            side="bottom"
            position="sticky"
            maxHeight="75vh"
            minHeight="25vh"
            height="25vh"
          >
            <>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum
              quaerat eveniet ipsam, ad facilis itaque iusto accusantium, facere
              quo omnis distinctio asperiores eaque quas? Dolores accusamus
              commodi ratione placeat aperiam. Lorem ipsum dolor sit, amet
              consectetur adipisicing elit. Cum quaerat eveniet ipsam, ad
              facilis itaque iusto accusantium, facere quo omnis distinctio
              asperiores eaque quas? Dolores accusamus commodi ratione placeat
              aperiam. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Cum quaerat eveniet ipsam, ad facilis itaque iusto accusantium,
              facere quo omnis distinctio asperiores eaque quas? Dolores
              accusamus commodi ratione placeat aperiam. Lorem ipsum dolor sit,
              amet consectetur adipisicing elit. Cum quaerat eveniet ipsam, ad
              facilis itaque iusto accusantium, facere quo omnis distinctio
              asperiores eaque quas? Dolores accusamus commodi ratione placeat
              aperiam. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Cum quaerat eveniet ipsam, ad facilis itaque iusto accusantium,
              facere quo omnis distinctio asperiores eaque quas? Dolores
              accusamus commodi ratione placeat aperiam. Lorem ipsum dolor sit,
              amet consectetur adipisicing elit. Cum quaerat eveniet ipsam, ad
              facilis itaque iusto accusantium, facere quo omnis distinctio
              asperiores eaque quas? Dolores accusamus commodi ratione placeat
              aperiam. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Cum quaerat eveniet ipsam, ad facilis itaque iusto accusantium,
              facere quo omnis distinctio asperiores eaque quas? Dolores
              accusamus commodi ratione placeat aperiam. Lorem ipsum dolor sit,
              amet consectetur adipisicing elit. Cum quaerat eveniet ipsam, ad
              facilis itaque iusto accusantium, facere quo omnis distinctio
              asperiores eaque quas? Dolores accusamus commodi ratione placeat
              aperiam. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Cum quaerat eveniet ipsam, ad facilis itaque iusto accusantium,
              facere quo omnis distinctio asperiores eaque quas? Dolores
              accusamus commodi ratione placeat aperiam.
            </>
          </PanelLayout>
        </section>

        <PanelLayout
          visible={xMenuVisible}
          className="h-screen pt-16"
          side="right"
          position="sticky"
          maxWidth="75vw"
          minWidth="25vw"
          width="25vw"
        >
          <>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum
            quaerat eveniet ipsam, ad facilis itaque iusto accusantium, facere
            quo omnis distinctio asperiores eaque quas? Dolores accusamus
            commodi ratione placeat aperiam. Lorem ipsum dolor sit, amet
            consectetur adipisicing elit. Cum quaerat eveniet ipsam, ad facilis
            itaque iusto accusantium, facere quo omnis distinctio asperiores
            eaque quas? Dolores accusamus commodi ratione placeat aperiam. Lorem
            ipsum dolor sit, amet consectetur adipisicing elit. Cum quaerat
            eveniet ipsam, ad facilis itaque iusto accusantium, facere quo omnis
            distinctio asperiores eaque quas? Dolores accusamus commodi ratione
            placeat aperiam. Lorem ipsum dolor sit, amet consectetur adipisicing
            elit. Cum quaerat eveniet ipsam, ad facilis itaque iusto
            accusantium, facere quo omnis distinctio asperiores eaque quas?
            Dolores accusamus commodi ratione placeat aperiam. Lorem ipsum dolor
            sit, amet consectetur adipisicing elit. Cum quaerat eveniet ipsam,
            ad facilis itaque iusto accusantium, facere quo omnis distinctio
            asperiores eaque quas? Dolores accusamus commodi ratione placeat
            aperiam. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Cum quaerat eveniet ipsam, ad facilis itaque iusto accusantium,
            facere quo omnis distinctio asperiores eaque quas? Dolores accusamus
            commodi ratione placeat aperiam. Lorem ipsum dolor sit, amet
            consectetur adipisicing elit. Cum quaerat eveniet ipsam, ad facilis
            itaque iusto accusantium, facere quo omnis distinctio asperiores
            eaque quas? Dolores accusamus commodi ratione placeat aperiam.
          </>
        </PanelLayout>
      </main>
    </>
  );
};
