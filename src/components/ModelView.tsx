import {
  Html,
  OrbitControls,
  PerspectiveCamera,
  View,
} from "@react-three/drei";
import IPhone from "@/components/IPhone";
import Lights from "@/components/Lights";
import { FC, MutableRefObject, Suspense } from "react";
import clsx from "clsx";
import Loader from "@/components/Loader";

interface Props {
  type: string;
  index: number;
  size: string;
  model: Object;
  setRotationState: Function;
  controlRef: MutableRefObject<any>;
}
const ModelView: FC<Props> = ({
  setRotationState,
  type,
  model,
  index,
  controlRef,
  size,
}) => {
  return (
    <View
      id={type}
      className={clsx(
        "w-full h-full absolute cursor-grab active:cursor-grabbing",
        index === 2 && "-right-full",
      )}
    >
      <ambientLight intensity={0.3} />
      <OrbitControls
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
      />
      <Lights />
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      <Suspense fallback={<Loader />}>
        <IPhone
          model={model}
          scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
        />
      </Suspense>
    </View>
  );
};

export default ModelView;
