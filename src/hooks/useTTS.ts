import { useState, useCallback, useMemo } from 'react'

interface UseTTSOptions {
  lang?: string
  rate?: number
  pitch?: number
  volume?: number
}

type Ponyfill = Pick<typeof globalThis, 'speechSynthesis' | 'SpeechSynthesisUtterance'>

export function useTTS({
  lang = 'id-ID',
  rate = 1,
  pitch = 1.1,
  volume = 0.8,
}: UseTTSOptions) {
  const ponyfill = useMemo<Ponyfill>(
    () => ({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      speechSynthesis: window.speechSynthesis || ((window as any)['webkitSpeechSynthesis'] as SpeechSynthesis),
      SpeechSynthesisUtterance:
        window.SpeechSynthesisUtterance ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((window as any)['webkitSpeechSynthesisUtterance'] as SpeechSynthesisUtterance)
    }),
    []
  );

  const [isPlaying, setIsPlaying] = useState(false)

  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string | undefined>();
  const handleSelectedVoiceChange = useCallback(
    ({ target: { value } }: { target: { value: string } }) => setSelectedVoiceURI(value),
    []
  );

  // Toggle play/stop. <Say> will speak when isPlaying=true via the render in ScriptSegmentCard.
  const handleSayUtteranceClick = useCallback(
    () => setIsPlaying(prev => !prev),
    []
  );

  const selectVoice = useCallback(
    (voices: readonly SpeechSynthesisVoice[]) =>
      voices.find(({ voiceURI }) => voiceURI === selectedVoiceURI) ||
      voices.find(({ lang }) => lang === window.navigator.language),
    [selectedVoiceURI]
  );

  return {
    ponyfill,
    // pass these directly to <Say> as props
    sayProps: { lang, rate, pitch, volume },
    handleSayUtteranceClick,
    isPlaying,
    setIsPlaying,
    selectVoice,
    handleSelectedVoiceChange,
    selectedVoiceURI,
  }
}
