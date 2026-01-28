export async function handleHealth(req, res) {
  return res.status(200).json({ message: "Healthy backend." });
}
