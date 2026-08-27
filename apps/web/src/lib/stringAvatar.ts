function stringToColor(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = value.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 55%, 40%)`;
}

export function stringAvatar(name: string) {
  const [first, second] = name.trim().split(" ");

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: second ? `${first[0]}${second[0]}` : `${first?.[0] ?? ""}`,
  };
}
