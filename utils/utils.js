import { RefObject } from "react";
import { useState, useEffect } from "react";
import { useDomEvent, MotionValue, useMotionValue, useDeprecatedInvertedScale } from "framer-motion";
import { spring } from "popmotion";
import { mix } from "@popmotion/popcorn";
import { debounce } from "lodash";
import { BsBox, BsPlusLg, BsClipboard, BsCheckCircleFill, BsSearch } from 'react-icons/bs'
import { FaRegPaperPlane,FaBriefcaseMedical } from 'react-icons/fa'
import { FiMail } from 'react-icons/fi'
import { RiLinksLine } from 'react-icons/ri'
import { HiOutlineOfficeBuilding } from 'react-icons/hi'
import { TbCertificate } from 'react-icons/tb'
import { IoMdQuote } from 'react-icons/io'
import { MdOutlineStickyNote2, MdOutlineFolderShared,MdRequestQuote, MdOutlinePayments } from 'react-icons/md'
import {
  AiOutlineEdit,
  AiOutlineFile,
  AiOutlineLeft,
  AiOutlineDown,
  AiOutlineRight,
  AiOutlineUp,
  AiOutlineCalendar,
  AiOutlineStar,
  AiOutlineDelete,
  AiOutlineClockCircle, AiOutlineCloudDownload ,
  AiOutlineCloseCircle,
  AiOutlineDollarCircle,
  AiOutlinePhone,
  AiFillCar,
  AiOutlineHome
} from 'react-icons/ai'
import {
  BiNotepad,
  BiCommentDetail,
  BiCommentAdd,
  BiCircle,
  BiTask,
} from 'react-icons/bi'


export const graphCMSImageLoader = ({ src }) => src;

// Absolute distance a wheel scroll event can travel outside of
// the defined constraints before we fire a "snap back" animation
const deltaThreshold = 5;

// If wheel event fires beyond constraints, multiple the delta by this amount
const elasticFactor = 0.2;

function springTo(value, from, to) {
  if (value.isAnimating()) return;

  value.start((complete) => {
    const animation = spring({
      from,
      to,
      velocity: value.getVelocity(),
      stiffness: 400,
      damping: 40,
    }).start({
      update: (v) => value.set(v),
      complete,
    });

    return () => animation.stop();
  });
}

const debouncedSpringTo = debounce(springTo, 100);

export function useWheelScroll(ref, y, constraints, onWheelCallback, isActive) {
  const onWheel = (event) => {
    event.preventDefault();

    const currentY = y.get();
    let newY = currentY - event.deltaY;
    let startedAnimation = false;
    const isWithinBounds =
      constraints && newY >= constraints.top && newY <= constraints.bottom;

    if (constraints && !isWithinBounds) {
      newY = mix(currentY, newY, elasticFactor);

      if (newY < constraints.top) {
        if (event.deltaY <= deltaThreshold) {
          springTo(y, newY, constraints.top);
          startedAnimation = true;
        } else {
          debouncedSpringTo(y, newY, constraints.top);
        }
      }

      if (newY > constraints.bottom) {
        if (event.deltaY >= -deltaThreshold) {
          springTo(y, newY, constraints.bottom);
          startedAnimation = true;
        } else {
          debouncedSpringTo(y, newY, constraints.bottom);
        }
      }
    }

    if (!startedAnimation) {
      y.stop();
      y.set(newY);
    } else {
      debouncedSpringTo.cancel();
    }

    onWheelCallback(event);
  };

  useDomEvent(ref, "wheel", isActive && onWheel, { passive: false });
}

export function useScrollConstraints(ref, measureConstraints) {
  const [constraints, setConstraints] = useState({
    top: 0,
    bottom: 0,
  });

  useEffect(() => {
    if (!measureConstraints) return;

    const element = ref.current;
    const viewportHeight = window.innerHeight;
    const contentTop = element.offsetTop;
    const contentHeight = element.offsetHeight;
    const scrollableViewport = viewportHeight - contentTop * 2;
    const top = Math.min(scrollableViewport - contentHeight, 0);

    setConstraints({ top, bottom: 0 });
  }, [measureConstraints]);

  return constraints;
}

export function useInvertedBorderRadius(radius) {
  const scaleX = useMotionValue(1);
  const scaleY = useMotionValue(1);
  const inverted = useDeprecatedInvertedScale({ scaleX, scaleY });
  const borderRadius = useMotionValue(`${radius}px`);

  useEffect(() => {
    function updateRadius() {
      const latestX = inverted.scaleX.get();
      const latestY = inverted.scaleY.get();
      const xRadius = latestX * radius + "px";
      const yRadius = latestY * radius + "px";

      borderRadius.set(`${xRadius} ${yRadius}`);
    }

    const unsubScaleX = inverted.scaleX.onChange(updateRadius);
    const unsubScaleY = inverted.scaleY.onChange(updateRadius);

    return () => {
      unsubScaleX();
      unsubScaleY();
    };
  }, [radius]);

  return {
    scaleX,
    scaleY,
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
    borderBottomLeftRadius: borderRadius,
    borderBottomRightRadius: borderRadius,
  };
}


export const getIcon = (item) => {
  return item == 'policy' ? (
    <BsBox />
  ) : item == 'activity' ? (
    <MdOutlineStickyNote2 />
  ) : item == 'client' ? (
    <MdOutlineFolderShared />
  ) : item == 'deal' ? (
    <BsClipboard />
  ) : item == 'emailCompose' ? (
    <FaRegPaperPlane />
  ) : item == 'email' ? (
    <FiMail />
  ) : item == 'plus' ? (
    <BsPlusLg />
  ) : item == 'calendar' ? (
    <AiOutlineCalendar />
  ) : item == 'note' ? (
    <BiNotepad />
  ) : item == 'down' ? (
    <AiOutlineDown />
  ) : item == 'left' ? (
    <AiOutlineLeft />
  ) : item == 'right' ? (
    <AiOutlineRight />
  ) : item == 'up' ? (
    <AiOutlineUp />
  ) : item == 'comment' ? (
    <BiCommentDetail />
  ) : item == 'newComment' ? (
    <BiCommentAdd />
  ) : item == 'circleCheck' ? (
    <BsCheckCircleFill />
  ) : item == 'circleX' ? (
    <AiOutlineCloseCircle />
  ) : item == 'circle' ? (
    <BiCircle />
  ) : item == 'file' ? (
    <AiOutlineFile />
  ) : item == 'link' ? (
    <RiLinksLine />
  ) : item == 'agency' ? (
    <HiOutlineOfficeBuilding />
  ) : item == 'edit' ? (
    <AiOutlineEdit />
  ) : item == 'trash' ? (
    <AiOutlineDelete />
  ) : item == 'star' ? (
    <AiOutlineStar />
  ) : item == 'task' ? (
    <BiTask />
  ) : item == 'clock' ? (
    <AiOutlineClockCircle />
  ) : item == 'cloudDownload' ? (
    <AiOutlineCloudDownload />
  ) : item == 'dollarSign' ? (
    <AiOutlineDollarCircle />
  ) : item == 'quote' ? (
    <MdRequestQuote />
  ) : item == 'payment' ? (
    <MdOutlinePayments />
  ) : item == 'certificate' ? (
    <TbCertificate />
  ) : item == 'search' ? (
    <BsSearch />
  ) : item == 'phone' ? (
    <AiOutlinePhone />
  ) : item == 'quoteIcon' ? (
    <IoMdQuote />
  ) : item == 'car' ? (
    <AiFillCar />
  ) : item == 'house' ? (
    <AiOutlineHome />
  ) : item == 'medical' ? (
    <FaBriefcaseMedical />
  ) : null
}

