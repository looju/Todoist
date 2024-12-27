import { Stack } from "expo-router";
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";

export default function RootLayout() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

  if (!publishableKey) {
    throw new Error("Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file");
  }

  const InitialUserLayout = () => {
    return <Stack />;
  };
  return (
    <ClerkProvider publishableKey={publishableKey}>
      <ClerkLoaded>
        <InitialUserLayout />
      </ClerkLoaded>
    </ClerkProvider>
  );
}
