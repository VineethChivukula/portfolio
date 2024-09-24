import { useRef, useLayoutEffect, useCallback } from "react";
import { gsap, Expo } from "gsap";
import "../styles/WigglyCursor.css";

function useTicker(callback, paused) {
  useLayoutEffect(() => {
    if (!paused && callback) {
      gsap.ticker.add(callback);
    }
    return () => {
      gsap.ticker.remove(callback);
    };
  }, [callback, paused]);
}

const EMPTY = {};
function useInstance(value = {}) {
  const ref = useRef(EMPTY);
  if (ref.current === EMPTY) {
    ref.current = typeof value === "function" ? value() : value;
  }
  return ref.current;
}

function getScale(diffX, diffY) {
  const distance = Math.sqrt(diffX * diffX + diffY * diffY);
  return Math.min(distance / 735, 0.35);
}

function getAngle(diffX, diffY) {
  return (Math.atan2(diffY, diffX) * 180) / Math.PI;
}

/**
 * WigglyCursor component creates a wiggly cursor effect that follows the mouse movement.
 * It uses GSAP for animations and React hooks for managing state and lifecycle.
 *
 * @component
 * @example
 * return (
 *   <WigglyCursor />
 * )
 *
 * @returns {JSX.Element} A JSX element containing the wiggly cursor.
 */
const WigglyCursor = () => {
  const jellyRef = useRef(null);

  const pos = useInstance(() => ({
    x: -50,
    y: -50,
  }));
  const vel = useInstance(() => ({ x: 0, y: 0 }));
  const set = useInstance();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      set.x = gsap.quickSetter(jellyRef.current, "x", "px");
      set.y = gsap.quickSetter(jellyRef.current, "y", "px");
      set.r = gsap.quickSetter(jellyRef.current, "rotate", "deg");
      set.sx = gsap.quickSetter(jellyRef.current, "scaleX");
      set.sy = gsap.quickSetter(jellyRef.current, "scaleY");
      set.width = gsap.quickSetter(jellyRef.current, "width", "px");
    });

    return () => ctx.revert();
  }, [set]);

  const loop = useCallback(() => {
    const rotation = getAngle(vel.x, vel.y);
    const scale = getScale(vel.x, vel.y);

    set.x(pos.x);
    set.y(pos.y);
    set.width(100 + scale * 150);
    set.r(rotation);
    set.sx(1 + scale);
    set.sy(1 - scale);
  }, [pos.x, pos.y, set, vel.x, vel.y]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const setFromEvent = (e) => {
        const x = e.clientX;
        const y = e.clientY;

        gsap.to(pos, {
          x,
          y,
          duration: 1.25,
          ease: Expo.easeOut,
          onUpdate: () => {
            vel.x = x - pos.x;
            vel.y = y - pos.y;
          },
        });

        loop();
      };

      window.addEventListener("mousemove", setFromEvent);

      return () => {
        window.removeEventListener("mousemove", setFromEvent);
      };
    });

    return () => ctx.revert();
  }, [loop, pos, vel]);

  useTicker(loop);

  return (
    <div className="container-div">
      <div ref={jellyRef} className="jelly-blob"></div>
    </div>
  );
};

export default WigglyCursor;
