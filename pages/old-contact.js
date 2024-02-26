import Head from "next/head";
import React, { useRef } from "react";
import { useState } from "react";
import Form from "../components/form/Form";
import Base from "../components/layout/Base";
import { getPage } from "../services";
import { motion } from "framer-motion";
import ContactForm from "../components/form/ContactForm";
import { useEffect } from "react";
import move from "lodash-move";
import { getIcon } from "../utils/utils";

const CARD_COLORS = ["#266678", "#cb7c7a", " #36a18b"];
const CARD_OFFSET = 10;
const SCALE_FACTOR = 0.06;

const cardStyle = {
  position: "absolute",
  borderRadius: "8px",
  transformOrigin: "top center",
  listStyle: "none",
};

const ContactIntro = ({ data }) => {
  return (
    <>
      <div className="text-lg font-bold lg:text-4xl">{data?.title}</div>
      <div className="w-full py-2">
        <div className="rounded-full w-1/2 h-[4px] bg-yellow-500"></div>
      </div>
      <div className="text-xs lg:text-sm font-semibold py-2 !text-white">
        {data?.content.map((c, i) => (
          <div
            key={Date()}
            strategy="afterInteractive"
            className="black-box"
            dangerouslySetInnerHTML={{ __html: c.html }}
          ></div>
        ))}
      </div>
      <div className="flex items-end justify-end w-full h-full p-4">
        <div className="w-[300px] flex text-xl gold-gradient h-[60px] rounded-lg shadow-lg font-bold justify-center items-center px-4">Swipe to begin! <span className="mx-4">{getIcon('swipe')}</span></div>
      </div>
    </>
  );
};

const ContactFormCard = ({ formFields }) => {
  return (
    <>
      {formFields ? (
        <ContactForm
          style={`lg:h-[700px] w-full flex flex-col p-4 rounded-lg text-white`}
          {...formFields}
        />
      ) : null}
    </>
  );
};

function Contact({ data }) {
  const [formFields, setFormFields] = useState(null);
  const [showProducerPanel, setShowProducerPanel] = useState(null);
  const [cards, setCards] = React.useState([]);
  const moveToEnd = (from) => {
    setCards(move(cards, from, cards.length - 1));
  };
  const constraintsRef = useRef(null);

  useEffect(() => {
    let isCancelled = false;
    const handleChange = async () => {
      if (!isCancelled) {
        setFormFields(data?.forms[0]);
      }
    };
    handleChange();
    return () => {
      isCancelled = true;
    };
  }, [data]);

  useEffect(() => {
    const handleChange = async () => {
      setCards([
        { id: "card-id-1", comp: <ContactIntro data={data} /> },
        {
          id: "card-id-2",
          comp: <ContactFormCard formFields={formFields} />,
        },
      ]);
    };
    handleChange();
    return () => {};
  }, [data, formFields]);

  return (
    <Base template={"SingleColumn"}>
      {/* <Head>
        <title>UWIBRISK</title>
        <meta name="description" content="United Western Insurance Brokers" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <div className="relative flex flex-col w-full h-full p-2 py-4 mx-auto space-y-4 xl:flex-row xl:w-3/4 lg:space-y-0">
        <motion.img
          src={data?.headerImage?.url}
          className="flex absolute w-full blur-[40px] top-[-50%] right-0 z-[-1] bg-cover scale-150"
        />
        <div className="relative flex items-center justify-center w-full h-full">
          <ul
            className="relative w-[370px] lg:w-[500px] xl:w-[800px] h-full"
            ref={constraintsRef}
          >
            {cards.map((card, index) => {
              const canDrag = index === 0;

              return (
                <motion.li
                  key={card.id}
                  style={{
                    ...cardStyle,
                    cursor: canDrag && card.id != 'card-id-2' ? "grab" : "auto",
                  }}
                  className="flex flex-col text-white bg-zinc-900/80 backdrop-blur-lg rounded-lg shadow-lg w-[370px] p-4 h-[700px] lg:w-[500px] lg:h-[800px] xl:w-[800px] xl:h-[800px]"
                  animate={{
                    left: index-CARD_OFFSET,
                    scale: 1 - index * SCALE_FACTOR,
                    zIndex: cards.length - index,
                  }}
                  drag={canDrag && card.id != 'card-id-2'? "x" : false}
                  dragConstraints={constraintsRef}
                  onDragEnd={() => moveToEnd(index)}
                >
                  {card.comp}
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </Base>
  );
}

export default Contact;

export async function getServerSideProps() {
  const data = await getPage("contact");
  return {
    props: { data },
  };
}
