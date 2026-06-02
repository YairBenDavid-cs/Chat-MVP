export async function startMockWorker(): Promise<void> {
  const { worker } = await import('@/mocks/browser');
  await worker.start({ onUnhandledRequest: 'warn' });
}
