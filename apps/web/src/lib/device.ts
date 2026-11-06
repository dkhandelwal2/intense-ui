import { headers } from "next/headers";

export async function checkIsMobileDevice(): Promise<boolean> {
  const headersList = await headers();
  const userAgentStr = headersList.get("user-agent") || "";
  return Boolean(
    userAgentStr &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgentStr)
  );
}

export const isMobileDevice = checkIsMobileDevice;
