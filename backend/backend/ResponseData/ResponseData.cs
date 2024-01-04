namespace backend.ResponseData
{
    public class ResponseData<T>
    {
        public int Status { get; set; }
        public string Message { get; set; }
        public T? Data { get; set; }
        public string? Error { get; set; }
        public ResponseData() { }

        public ResponseData(int status, string message, T? data, string? error)
        {
            Status = status;
            Message = message;
            Data = data;
            Error = error;
        }
    }
}
