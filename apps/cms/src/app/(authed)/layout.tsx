import dynamic from "next/dynamic";

export default dynamic(() => import("./_components/AuthedLayout"), { ssr: false });
