import { create } from 'zustand'
import type { TwoFAState, TwoFAActions } from '@/types/auth'

type TwoFAStore = TwoFAState & TwoFAActions

export const use2FAStore = create<TwoFAStore>((set) => ({
  // Initial state
  secret: null,
  qrCodeUrl: null,
  recoveryCodes: [],
  isEnabled: false,

  // Actions
  setSetupData: (secret: string, qrCodeUrl: string) =>
    set({
      secret,
      qrCodeUrl,
    }),

  setRecoveryCodes: (codes: string[]) =>
    set({
      recoveryCodes: codes,
    }),

  setEnabled: (enabled: boolean) =>
    set({
      isEnabled: enabled,
    }),

  clearSetup: () =>
    set({
      secret: null,
      qrCodeUrl: null,
      recoveryCodes: [],
    }),
}))

// Selector hooks
export const use2FASecret = () => use2FAStore((state) => state.secret)
export const use2FAQRCode = () => use2FAStore((state) => state.qrCodeUrl)
export const use2FARecoveryCodes = () => use2FAStore((state) => state.recoveryCodes)
export const use2FAEnabled = () => use2FAStore((state) => state.isEnabled)
