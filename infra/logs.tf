# ---------------------------------------------------------------------------
# CloudWatch Log Group for ECS tasks
# ---------------------------------------------------------------------------

resource "aws_cloudwatch_log_group" "mcp" {
  name              = "/ecs/${var.project_name}-mcp"
  retention_in_days = 30

  tags = {
    Name = "${var.project_name}-mcp-logs"
  }
}
