import java.util.Random;
import java.util.Scanner;

public class subset_sum {

    // Implementación optimizada
    static boolean isSubsetSumOptimized(int[] arr, int sum) {
        boolean[] dp = new boolean[sum + 1];
        dp[0] = true;

        for (int num : arr) {
            for (int j = sum; j >= num; j--) {
                dp[j] |= dp[j - num];
            }
        }

        return dp[sum];
    }

    // Implementación recursiva
    static boolean isSubsetSumRec(int[] arr, int n, int sum) {
        // Caso base
        if (sum == 0) return true;
        if (n == 0) return false;

        // Si el último elemento es mayor que la suma, lo ignoramos
        if (arr[n - 1] > sum) return isSubsetSumRec(arr, n - 1, sum);

        // Verificamos si se puede obtener la suma incluyendo o excluyendo el último elemento
        return isSubsetSumRec(arr, n - 1, sum) || isSubsetSumRec(arr, n - 1, sum - arr[n - 1]);
    }

    static boolean isSubsetSumRecursive(int[] arr, int sum) {
        return isSubsetSumRec(arr, arr.length, sum);
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Random random = new Random();

        // Input: tamaño del array
        System.out.print("Ingrese cantidad de elementos del array: ");
        int n = scanner.nextInt();

        int[] arr = new int[n];
        System.out.println("Generando elementos aleatorios para el array:");
        for (int i = 0; i < n; i++) {
            arr[i] = random.nextInt(100) + 1; // Genera números aleatorios entre 1 y 100
            System.out.println("Elemento " + (i + 1) + ": " + arr[i]);
        }

        // Que el usuario ingrese el valor a buscar
        System.out.print("Ingrese el valor a buscar: ");
        int sum = scanner.nextInt();

        // Detectar casos problemáticos para la recursión
        if (n > 30 || sum > 1000) {
            System.out.println("Problema demasiado grande para resolver recursivamente. Usando implementación optimizada.");
        } else {
            // Tiempo de ejecución de la implementación recursiva
            long startRecursive = System.nanoTime();
            boolean recursiveResult = isSubsetSumRecursive(arr, sum);
            long endRecursive = System.nanoTime();

            double timeRecursive = (endRecursive - startRecursive) / 1_000_000.0; // Convertir nanosegundos a milisegundos
            System.out.println("Implementación estándar: " + recursiveResult);
            System.out.printf("Tiempo tomado (ms): %.3f%n", timeRecursive);
        }

        // Siempre usamos la implementación optimizada como respaldo
        long startOptimized = System.nanoTime();
        boolean optimizedResult = isSubsetSumOptimized(arr, sum);
        long endOptimized = System.nanoTime();

        double timeOptimized = (endOptimized - startOptimized) / 1_000_000.0; // Convertir nanosegundos a milisegundos
        System.out.println("Implementación optimizada: " + optimizedResult);
        System.out.printf("Tiempo tomado (ms): %.3f%n", timeOptimized);

        scanner.close();
    }
}
