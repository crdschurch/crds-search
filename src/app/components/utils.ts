export class Utils {
  public static formatLabel(label) {
    if (!label) return;
    label = label.replace("_", " ");
    if (label.endsWith("s") || label == "all") return label;
    return label + "s";
  }
}
