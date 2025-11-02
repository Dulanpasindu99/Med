export function isValidNIC(nic: string): boolean {
  const oldNIC = /^\d{9}[VvXx]$/;
  const newNIC = /^\d{12}$/;
  return oldNIC.test(nic) || newNIC.test(nic);
}
