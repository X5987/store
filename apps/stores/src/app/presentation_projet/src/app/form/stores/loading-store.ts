import {
  patchState,
  signalStoreFeature,
  withMethods,
  withState,
} from '@ngrx/signals';

export function withLoading() {
  return signalStoreFeature(
    withState({
      isLoading: false,
      error: null as string | null,
    }),
    withMethods((store) => ({
      setLoading(isLoading: boolean) {
        patchState(store, { isLoading });
      },
      setError(error: string | null) {
        patchState(store, { error });
      },
    }))
  );
}
