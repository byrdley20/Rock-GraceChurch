﻿<%@ Control Language="C#" AutoEventWireup="true" CodeFile="GroupSimpleRegister.ascx.cs" Inherits="RockWeb.Blocks.Groups.GroupSimpleRegister" %>

<asp:UpdatePanel ID="upPayment" runat="server">
    <ContentTemplate>

        <asp:Panel ID="pnlInputInfo" runat="server">


                <fieldset>
                    <Rock:FirstNameTextBox ID="txtFirstName" runat="server" Placeholder="First Name" />
                    <Rock:RockTextBox ID="txtLastName" runat="server" Placeholder="Last Name" />
                    <div class="form-group">
                        <Rock:EmailBox ID="txtEmail" runat="server" Placeholder="Email" />
                    </div>
                </fieldset>

                <Rock:NotificationBox ID="nbError" runat="server" Visible="false" NotificationBoxType="Danger"></Rock:NotificationBox>

                <div id="divActions" runat="server" class="actions">
                    <asp:LinkButton ID="btnSave" runat="server" AccessKey="s" ToolTip="Alt+s" Text="Save" CssClass="btn btn-primary" OnClick="btnSave_Click" />
                </div>

        </asp:Panel>

        <asp:Panel ID="pnlSuccess" runat="server"  Visible="false">

                <Rock:NotificationBox ID="nbSuccess" runat="server" Title="Thank You" NotificationBoxType="Success"></Rock:NotificationBox>

        </asp:Panel>

    </ContentTemplate>
</asp:UpdatePanel>


