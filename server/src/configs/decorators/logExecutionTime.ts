export function LogExecutionTime() {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            const startTime = Date.now();
            const result = await originalMethod.apply(this, args);
            const endTime = Date.now();
            const duration = endTime - startTime;

            console.log(`[${propertyKey}] Execution took ${duration} ms`);
            return result;
        };

        return descriptor;
    };
}
